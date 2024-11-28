import { PropertyRepository } from '../../../../domain/property/repository/property.repository';
import { EventBus } from '../../../../shared/domain/event-bus';
import { PropertyType } from '../../../../domain/property/types/property-type';
import { PropertyCreatedEvent } from '../../../../domain/property/events/property-created.event';
import { CreatePropertyUseCase } from '../create-property.use.case';

describe('CreatePropertyUseCase', () => {
  let useCase: CreatePropertyUseCase;
  let mockPropertyRepository: jest.Mocked<PropertyRepository>;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    mockPropertyRepository = {
      save: jest.fn(),
      findById: jest.fn(),
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

    useCase = new CreatePropertyUseCase(
      mockPropertyRepository,
      mockEventBus
    );
  });

  const validCommand = {
    psiId: 'test-psi-123',
    title: 'Beautiful Apartment',
    description: 'A great place to live',
    address: 'Calle Test 123',
    type: PropertyType.APARTMENT,
    location: {
      city: 'Barcelona',
      neighborhood: 'Eixample'
    },
    price: 350000,
    features: {
      rooms: 3,
      bathrooms: 2,
      squareMeters: 90,
      hasParking: true
    }
  };

  it('should create a property and return its id', async () => {
    const result = await useCase.execute(validCommand);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(mockPropertyRepository.save).toHaveBeenCalled();
    expect(mockEventBus.publish).toHaveBeenCalledWith(
      expect.any(PropertyCreatedEvent)
    );
  });
});
