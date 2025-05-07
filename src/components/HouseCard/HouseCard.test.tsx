import { render, screen, fireEvent } from '@/tests/testUtils';
import { vi } from 'vitest';
import HouseCard from './index';
import { House } from '@/types/house';

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockHouse: House = {
  id: 1,
  address: '123 Test St',
  homeowner: 'Jane Doe',
  price: 250000,
  photoURL: 'https://example.com/photo.jpg',
};

describe('HouseCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders house data correctly', () => {
    render(<HouseCard house={ mockHouse } />);

    expect(screen.getByText(/123 Test St/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/\$250,000/)).toBeInTheDocument();
    expect(screen.getByAltText(/House at 123 Test St/i)).toBeInTheDocument();
  });

  it('navigates when clicked', () => {
    render(<HouseCard house={ mockHouse } />);

    fireEvent.click(screen.getByRole('img'));
    expect(mockNavigate).toHaveBeenCalledWith('/house/1');
  });

  it('shows fallback image on error', () => {
    render(<HouseCard house={ mockHouse } />);

    const image = screen.getByAltText(/House at 123 Test St/i) as HTMLImageElement;

    // Simulate an error loading the image
    fireEvent.error(image);

    expect(screen.getByText(/Can't load the image/i)).toBeInTheDocument();
    expect(screen.getByAltText(/HomeVision logo/i)).toBeInTheDocument();
  });
});
