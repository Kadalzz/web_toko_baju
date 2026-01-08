// ============================================
// ORDER SERVICE - Data Access Layer
// ============================================
// Handles all order-related database operations
// ============================================

import { supabase } from '../lib/supabase';
import type { Order, OrderItem, OrderStatus, Address, PaymentMethod } from '../types';

/**
 * Generate unique order number
 */
const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FS${year}${month}${day}${random}`;
};

/**
 * Create new order
 */
export const createOrder = async (orderData: {
  items: Array<{
    product_id: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
  }>;
  shipping_address: Address;
  payment_method: PaymentMethod;
  notes?: string;
  promo_code?: string;
}): Promise<Order> => {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Calculate totals
  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping_cost = calculateShipping(subtotal);
  const discount = 0; // TODO: Apply promo code discount
  const total = subtotal + shipping_cost - discount;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: generateOrderNumber(),
      user_id: user.id,
      subtotal,
      discount,
      shipping_cost,
      total,
      status: 'pending',
      payment_method: orderData.payment_method,
      payment_status: 'pending',
      shipping_address: orderData.shipping_address as never,
      notes: orderData.notes,
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  // Create order items
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    price: item.price,
    subtotal: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    // Rollback order if items fail
    await supabase.from('orders').delete().eq('id', order.id);
    throw new Error(itemsError.message);
  }

  return order as unknown as Order;
};

/**
 * Calculate shipping cost based on subtotal
 */
const calculateShipping = (subtotal: number): number => {
  if (subtotal >= 500000) return 0; // Free shipping for orders >= 500k
  if (subtotal >= 200000) return 10000;
  return 15000;
};

/**
 * Get user orders
 */
export const getUserOrders = async (): Promise<Order[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as unknown as Order[]) || [];
};

/**
 * Get order by ID with items
 */
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(name, images))')
    .eq('id', orderId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(error.message);
  }

  return data as unknown as Order;
};

/**
 * Get order by order number
 */
export const getOrderByNumber = async (orderNumber: string): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(name, images))')
    .eq('order_number', orderNumber)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(error.message);
  }

  return data as unknown as Order;
};

/**
 * Update payment status
 */
export const updatePaymentStatus = async (
  orderId: string,
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
): Promise<Order> => {
  const updates: Partial<Order> = {
    payment_status: paymentStatus,
    updated_at: new Date().toISOString(),
  };

  // Auto update order status when paid
  if (paymentStatus === 'paid') {
    updates.status = 'paid';
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates as never)
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as Order;
};

// ============================================
// ADMIN OPERATIONS
// ============================================

/**
 * Get all orders (Admin only)
 */
export const getAllOrders = async (
  status?: OrderStatus,
  page: number = 1,
  limit: number = 20
): Promise<{ orders: Order[]; total: number }> => {
  let query = supabase
    .from('orders')
    .select('*, profiles(full_name, email)', { count: 'exact' });

  if (status) {
    query = query.eq('status', status);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    orders: (data as unknown as Order[]) || [],
    total: count || 0,
  };
};

/**
 * Update order status (Admin only)
 */
export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  trackingNumber?: string
): Promise<Order> => {
  const updates: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (trackingNumber) {
    updates.tracking_number = trackingNumber;
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates as never)
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as Order;
};

/**
 * Get order statistics (Admin only)
 */
export const getOrderStats = async (): Promise<{
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
  processing_orders: number;
}> => {
  const { data, error } = await supabase.rpc('get_order_stats');

  if (error) {
    // Return default values if function doesn't exist
    return {
      total_orders: 0,
      total_revenue: 0,
      pending_orders: 0,
      processing_orders: 0,
    };
  }

  return data;
};
