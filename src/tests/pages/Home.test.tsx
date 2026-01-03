import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Home from '../../pages/Home';

describe('Home Page', () => {
  it('renders the home page', () => {
    render(<Home />);
    
    // The page should render without crashing
    expect(document.body).toBeInTheDocument();
  });

  it('contains main content sections', () => {
    render(<Home />);
    
    // Check for main element or key sections
    const mainContent = document.querySelector('main') || document.querySelector('section');
    expect(mainContent).toBeInTheDocument();
  });
});
