import { DomainEvent } from '../../../shared/domain/event-bus';
import { Property } from '../entity/property';

export class PropertyDeletedEvent extends DomainEvent {
  constructor(private readonly property: Property) {
    super(property.id);
  }

  eventName(): string {
    return 'property.deleted';
  }

  getProperty(): Property {
    return this.property;
  }
} 