import { PropertyRepository } from '../../../domain/property/repository/property.repository';
import { EventBus } from '../../../shared/domain/event-bus';
import { PropertyNotFoundError } from './errors/property-not-found.error';
import { PropertyDeletedEvent } from '../../../domain/property/events/property-deleted.event';
import { PropertyStatus } from '../../../domain/property/types/property-status';

export class DeletePropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const property = await this.propertyRepository.findById(id);

      if (!property) {
        throw new PropertyNotFoundError(id);
      }

      if (property.status === PropertyStatus.PUBLISHED) {
        throw new Error('No se puede eliminar una propiedad publicada');
      }

      if (property.status === PropertyStatus.RESERVED) {
        throw new Error('No se puede eliminar una propiedad reservada');
      }

      await this.propertyRepository.delete(id);
      await this.eventBus.publish(new PropertyDeletedEvent(property));
    } catch (error: unknown) {
      if (error instanceof PropertyNotFoundError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Error desconocido al eliminar la propiedad');
    }
  }
} 