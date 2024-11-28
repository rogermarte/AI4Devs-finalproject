import { GetPropertiesByStatusUseCase } from '../get-properties-by-status.use-case';
import { PropertyRepository } from '../../../../domain/property/repository/property.repository';
import { Property } from '../../../../domain/property/entity/property';
import { PropertyType } from '../../../../domain/property/types/property-type';
import { PropertyFeatures } from '../../../../domain/property/value-objects/property-features';
import { PropertyStatus } from '../../../../domain/property/types/property-status';

describe('GetPropertiesByStatusUseCase', () => {
  let useCase: GetPropertiesByStatusUseCase;
  let mockPropertyRepository: jest.Mocked<PropertyRepository>;

  const createMockProperty = (status: PropertyStatus = PropertyStatus.DRAFT) => {
    const property = Property.create({
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
    });

    if (status === PropertyStatus.PUBLISHED) {
      property.publish();
    } else if (status === PropertyStatus.RESERVED) {
      property.publish();
      property.reserve();
    }

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

    useCase = new GetPropertiesByStatusUseCase(mockPropertyRepository);
  });

  it('should return properties filtered by status', async () => {
    const publishedProperties = [
      createMockProperty(PropertyStatus.PUBLISHED),
      createMockProperty(PropertyStatus.PUBLISHED)
    ];

    mockPropertyRepository.findByStatus.mockResolvedValue(publishedProperties);

    const result = await useCase.execute(PropertyStatus.PUBLISHED);

    expect(result).toHaveLength(2);
    expect(mockPropertyRepository.findByStatus).toHaveBeenCalledWith(PropertyStatus.PUBLISHED);
    result.forEach(property => {
      expect(property.status).toBe(PropertyStatus.PUBLISHED);
    });
  });

  it('should return empty array when no properties found', async () => {
    mockPropertyRepository.findByStatus.mockResolvedValue([]);

    const result = await useCase.execute(PropertyStatus.RESERVED);

    expect(result).toHaveLength(0);
    expect(mockPropertyRepository.findByStatus).toHaveBeenCalledWith(PropertyStatus.RESERVED);
  });

  it('should handle repository errors', async () => {
    mockPropertyRepository.findByStatus.mockRejectedValue(new Error('DB Error'));

    await expect(useCase.execute(PropertyStatus.DRAFT))
      .rejects
      .toThrow('Error al buscar propiedades: DB Error');
  });
}); 