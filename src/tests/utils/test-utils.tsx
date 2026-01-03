import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Wrapper with all providers
interface WrapperProps {
  children: ReactNode;
}

const AllProviders = ({ children }: WrapperProps) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...options }),
  };
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
export { userEvent };
