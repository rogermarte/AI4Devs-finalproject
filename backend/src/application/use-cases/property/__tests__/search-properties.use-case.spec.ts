import { SearchPropertiesUseCase } from '../search-properties.use-case';
import { PropertyRepository } from '../../../../domain/property/repository/property.repository';
import { Property } from '../../../../domain/property/entity/property';
import { PropertyType } from '../../../../domain/property/types/property-type';
import { PropertyFeatures } from '../../../../domain/property/value-objects/property-features';
import { PropertyStatus } from '../../../../domain/property/types/property-status';

describe('SearchPropertiesUseCase', () => {
  let useCase: SearchPropertiesUseCase;
  let mockPropertyRepository: jest.Mocked<PropertyRepository>;

  const createMockProperty = (overrides = {}) => {
    const defaultProps = {
      psiId: `test-psi-${Math.random()}`,
      title: 'Test Property',
      description: 'Test Description',
      address: 'Test Address',
      type: PropertyType.APARTMENT,
      location: {
        city: 'Barcelona',
        neighborhood: 'Eixample'
      },
      price: 300000,
      features: PropertyFeatures.create({
        rooms: 2,
        bathrooms: 1,
        squareMeters: 80,
        hasParking: true
      })
    };

    const property = Property.create({
      ...defaultProps,
      ...overrides
    });

    return property;
  };

  beforeEach(() => {
    mockPropertyRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findByPsiId: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
      delete: jest.fn(),
      search: jest.fn(),
    };

    useCase = new SearchPropertiesUseCase(mockPropertyRepository);
  });

  it('should search properties with all criteria', async () => {
    const searchCriteria = {
      minPrice: 200000,
      maxPrice: 400000,
      city: 'Barcelona',
      type: PropertyType.APARTMENT,
      minRooms: 2,
      status: PropertyStatus.PUBLISHED
    };

    const mockProperties = [
      createMockProperty(),
      createMockProperty()
    ];

    mockPropertyRepository.search.mockResolvedValue(mockProperties);

    const result = await useCase.execute(searchCriteria);

    expect(result).toHaveLength(2);
    expect(mockPropertyRepository.search).toHaveBeenCalledWith(searchCriteria);
  });

  it('should search properties with partial criteria', async () => {
    const searchCriteria = {
      city: 'Barcelona',
      minRooms: 2
    };

    const mockProperties = [createMockProperty()];
    mockPropertyRepository.search.mockResolvedValue(mockProperties);

    const result = await useCase.execute(searchCriteria);

    expect(result).toHaveLength(1);
    expect(mockPropertyRepository.search).toHaveBeenCalledWith(searchCriteria);
  });

  it('should return empty array when no properties match criteria', async () => {
    const searchCriteria = {
      minPrice: 1000000,
      city: 'Madrid'
    };

    mockPropertyRepository.search.mockResolvedValue([]);

    const result = await useCase.execute(searchCriteria);

    expect(result).toHaveLength(0);
  });

  it('should handle repository errors', async () => {
    mockPropertyRepository.search.mockRejectedValue(new Error('DB Error'));

    await expect(useCase.execute({}))
      .rejects
      .toThrow('Error al buscar propiedades: DB Error');
  });

  it('should validate price range', async () => {
    const searchCriteria = {
      minPrice: 400000,
      maxPrice: 200000
    };

    await expect(useCase.execute(searchCriteria))
      .rejects
      .toThrow('El precio mínimo no puede ser mayor que el precio máximo');
  });
}); 