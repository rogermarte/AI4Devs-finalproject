import { UpdatePropertyUseCase } from '../update-property.use-case';
import { PropertyRepository } from '../../../../domain/property/repository/property.repository';
import { Property } from '../../../../domain/property/entity/property';
import { PropertyType } from '../../../../domain/property/types/property-type';
import { PropertyFeatures } from '../../../../domain/property/value-objects/property-features';
import { PropertyNotFoundError } from '../errors/property-not-found.error';
import { EventBus } from '../../../../shared/domain/event-bus';

describe('UpdatePropertyUseCase', () => {
  let useCase: UpdatePropertyUseCase;
  let mockPropertyRepository: jest.Mocked<PropertyRepository>;
  let mockEventBus: jest.Mocked<EventBus>;

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

    mockEventBus = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };

    useCase = new UpdatePropertyUseCase(mockPropertyRepository, mockEventBus);
  });

  it('should update property when it exists', async () => {
    mockPropertyRepository.findById.mockResolvedValue(mockProperty);

    const updateCommand = {
      id: 'existing-id',
      title: 'Updated Title',
      description: 'Updated Description'
    };

    await useCase.execute(updateCommand);

    expect(mockPropertyRepository.findById).toHaveBeenCalledWith('existing-id');
    expect(mockPropertyRepository.save).toHaveBeenCalled();
    expect(mockEventBus.publish).toHaveBeenCalled();
  });

  it('should throw PropertyNotFoundError when property does not exist', async () => {
    mockPropertyRepository.findById.mockResolvedValue(null);

    const updateCommand = {
      id: 'non-existent-id',
      title: 'Updated Title'
    };

    await expect(useCase.execute(updateCommand))
      .rejects
      .toThrow(PropertyNotFoundError);
  });

  it('should only update provided fields', async () => {
    mockPropertyRepository.findById.mockResolvedValue(mockProperty);

    const updateCommand = {
      id: mockProperty.id,
      title: 'Updated Title'
    };

    await useCase.execute(updateCommand);

    expect(mockPropertyRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Updated Title',
        description: mockProperty.description,
        price: mockProperty.price
      })
    );
  });

  it('should validate updated values', async () => {
    mockPropertyRepository.findById.mockResolvedValue(mockProperty);

    const updateCommand = {
      id: mockProperty.id,
      price: -1000
    };

    await expect(useCase.execute(updateCommand))
      .rejects
      .toThrow('El precio debe ser positivo');
  });
}); 