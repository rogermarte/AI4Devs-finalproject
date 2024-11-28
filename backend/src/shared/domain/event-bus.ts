export abstract class DomainEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly occurredOn: Date = new Date()
  ) {}

  abstract eventName(): string;
}

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(eventName: string, handler: (event: DomainEvent) => Promise<void>): void;
} 