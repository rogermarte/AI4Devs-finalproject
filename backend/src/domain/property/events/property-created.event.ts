import { DomainEvent } from '../../../shared/domain/domain-event';

export class PropertyCreatedEvent implements DomainEvent {
  readonly occurredOn: Date;

  constructor(readonly aggregateId: string) {
    this.occurredOn = new Date();
  }

  eventName(): string {
    return 'PropertyCreated';
  }
} 