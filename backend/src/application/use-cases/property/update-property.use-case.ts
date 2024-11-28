import { PropertyRepository } from '../../../domain/property/repository/property.repository';
import { EventBus } from '../../../shared/domain/event-bus';
import { PropertyNotFoundError } from './errors/property-not-found.error';
import { PropertyUpdatedEvent } from '../../../domain/property/events/property-updated.event';

interface UpdatePropertyCommand {
  id: string;
  title?: string;
  description?: string;
  price?: number;
}

export class UpdatePropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: UpdatePropertyCommand): Promise<void> {
    try {
      const property = await this.propertyRepository.findById(command.id);

      if (!property) {
        throw new PropertyNotFoundError(command.id);
      }

      if (command.title !== undefined) {
        property.updateTitle(command.title);
      }

      if (command.description !== undefined) {
        property.updateDescription(command.description);
      }

      if (command.price !== undefined) {
        property.updatePrice(command.price);
      }

      await this.propertyRepository.save(property);
      await this.eventBus.publish(new PropertyUpdatedEvent(property.id));
    } catch (error: unknown) {
      if (error instanceof PropertyNotFoundError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw new Error(`Error al actualizar la propiedad: ${error.message}`);
      }
      
      throw new Error('Error desconocido al actualizar la propiedad');
    }
  }
} 