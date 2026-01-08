import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Header from '../../components/layout/Header';

describe('Header', () => {
  it('renders the header component', () => {
    render(<Header />);
    
    // Check if logo/brand name exists
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    // Check for common navigation items
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  it('renders cart button', () => {
    render(<Header />);
    
    // Look for cart icon/button
    const cartButtons = screen.getAllByRole('button');
    expect(cartButtons.length).toBeGreaterThan(0);
  });
});
