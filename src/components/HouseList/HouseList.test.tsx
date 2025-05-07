import { render, screen } from '@/tests/testUtils';
import { vi } from 'vitest';
import HouseList from './index';
import { useHouses } from '@/context/HousesContext';
import { House } from '@/types/house';

// Mock the useHouses hook
vi.mock('@/context/HousesContext', async () => {
  const actual = await vi.importActual('@/context/HousesContext'); return {
    ...actual,
    useHouses: vi.fn(),
  };
});

const mockUseHouses = useHouses as unknown as ReturnType<typeof vi.fn>;

const mockHouse: House = {
  id: 1,
  address: '123 Test St',
  homeowner: 'Jane Doe',
  price: 250000,
  photoURL: 'https://example.com/photo.jpg',
};

describe('HouseList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders house cards when houses are available', () => {
    mockUseHouses.mockReturnValue({
      houses: [mockHouse],
      isLoading: false,
      isError: false,
      hasMore: false,
      loadMore: vi.fn(),
      clearHouses: vi.fn(),
    });

    render(<HouseList />);

    expect(screen.getByText(/123 Test St/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/\$250,000/)).toBeInTheDocument();
  });

  it('shows loading skeletons when loading', () => {
    mockUseHouses.mockReturnValue({
      houses: [],
      isLoading: true,
      isError: false,
      hasMore: false,
      loadMore: vi.fn(),
      clearHouses: vi.fn(),
    });

    render(<HouseList />);

    expect(screen.getAllByTestId('house-card-skeleton')).toHaveLength(10);
  });

  it('shows error message when there is an error', () => {
    mockUseHouses.mockReturnValue({
      houses: [],
      isLoading: false,
      isError: true,
      hasMore: false,
      loadMore: vi.fn(),
      clearHouses: vi.fn(),
    });

    render(<HouseList />);

    expect(screen.getByText(/Error fetching houses/i)).toBeInTheDocument();
  });
});
