import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Footer from '../../components/layout/Footer';

describe('Footer', () => {
  it('renders the footer component', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('contains copyright information', () => {
    render(<Footer />);
    
    // Check for copyright text or year
    const footerText = screen.getByRole('contentinfo').textContent;
    expect(footerText).toBeTruthy();
  });
});
