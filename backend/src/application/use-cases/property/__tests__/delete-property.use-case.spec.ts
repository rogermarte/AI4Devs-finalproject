import { DeletePropertyUseCase } from '../delete-property.use-case';
import { PropertyRepository } from '../../../../domain/property/repository/property.repository';
import { Property } from '../../../../domain/property/entity/property';
import { PropertyType } from '../../../../domain/property/types/property-type';
import { PropertyFeatures } from '../../../../domain/property/value-objects/property-features';
import { PropertyNotFoundError } from '../errors/property-not-found.error';
import { EventBus } from '../../../../shared/domain/event-bus';

describe('DeletePropertyUseCase', () => {
  let useCase: DeletePropertyUseCase;
  let mockPropertyRepository: jest.Mocked<PropertyRepository>;
  let mockEventBus: jest.Mocked<EventBus>;

  const createMockProperty = () => Property.create({
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

    mockEventBus = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };

    useCase = new DeletePropertyUseCase(mockPropertyRepository, mockEventBus);
  });

  it('should delete a draft property', async () => {
    const property = createMockProperty();
    mockPropertyRepository.findById.mockResolvedValue(property);
    mockPropertyRepository.delete.mockResolvedValue();

    await useCase.execute(property.id);

    expect(mockPropertyRepository.delete).toHaveBeenCalledWith(property.id);
    expect(mockEventBus.publish).toHaveBeenCalled();
  });

  it('should throw error when property does not exist', async () => {
    mockPropertyRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id'))
      .rejects
      .toThrow(PropertyNotFoundError);
  });

  it('should throw error when trying to delete a published property', async () => {
    const property = createMockProperty();
    property.publish();
    mockPropertyRepository.findById.mockResolvedValue(property);

    await expect(useCase.execute(property.id))
      .rejects
      .toThrow('No se puede eliminar una propiedad publicada');
  });

  it('should throw error when trying to delete a reserved property', async () => {
    const property = createMockProperty();
    property.publish();
    property.reserve();
    mockPropertyRepository.findById.mockResolvedValue(property);

    await expect(useCase.execute(property.id))
      .rejects
      .toThrow('No se puede eliminar una propiedad reservada');
  });
}); 