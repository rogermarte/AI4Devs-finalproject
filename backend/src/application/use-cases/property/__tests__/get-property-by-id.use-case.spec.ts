import { GetPropertyByIdUseCase } from '../get-property-by-id.use-case';
import { PropertyRepository } from '../../../../domain/property/repository/property.repository';
import { Property } from '../../../../domain/property/entity/property';
import { PropertyType } from '../../../../domain/property/types/property-type';
import { PropertyFeatures } from '../../../../domain/property/value-objects/property-features';
import { PropertyNotFoundError } from '../errors/property-not-found.error';

describe('GetPropertyByIdUseCase', () => {
  let useCase: GetPropertyByIdUseCase;
  let mockPropertyRepository: jest.Mocked<PropertyRepository>;

  const mockProperty = Property.create({
    psiId: 'test-psi-123',
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

    useCase = new GetPropertyByIdUseCase(mockPropertyRepository);
  });

  it('should return property when it exists', async () => {
    mockPropertyRepository.findById.mockResolvedValue(mockProperty);

    const result = await useCase.execute(mockProperty.id);

    expect(result).toBeDefined();
    expect(result.id).toBe(mockProperty.id);
    expect(mockPropertyRepository.findById).toHaveBeenCalledWith(mockProperty.id);
  });

  it('should throw PropertyNotFoundError when property does not exist', async () => {
    mockPropertyRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id'))
      .rejects
      .toThrow(PropertyNotFoundError);
  });

  it('should throw error if repository fails', async () => {
    mockPropertyRepository.findById.mockRejectedValue(new Error('DB Error'));

    await expect(useCase.execute(mockProperty.id))
      .rejects
      .toThrow('Error al buscar la propiedad: DB Error');
  });
});