import { Property } from '../../../domain/property/entity/property';
import { PropertyRepository } from '../../../domain/property/repository/property.repository';
import { EventBus } from '../../../shared/domain/event-bus';
import { PropertyCreatedEvent } from '../../../domain/property/events/property-created.event';
import { PropertyFeatures } from '../../../domain/property/value-objects/property-features';
import { PropertyType } from '../../../domain/property/types/property-type';

interface CreatePropertyCommand {
  psiId: string;
  title: string;
  description: string;
  address: string;
  type: PropertyType;
  location: {
    city: string;
    neighborhood: string;
  };
  price: number;
  features: {
    rooms: number;
    bathrooms: number;
    squareMeters: number;
    hasParking: boolean;
  };
}

export class CreatePropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreatePropertyCommand): Promise<string> {
    try {
      const property = Property.create({
        psiId: command.psiId,
        title: command.title,
        description: command.description,
        address: command.address,
        type: command.type,
        location: command.location,
        price: command.price,
        features: PropertyFeatures.create(command.features)
      });

      await this.propertyRepository.save(property);
      await this.eventBus.publish(new PropertyCreatedEvent(property.id));

      return property.id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al crear la propiedad: ${error.message}`);
      }
      throw new Error('Error desconocido al crear la propiedad');
    }
  }
}
