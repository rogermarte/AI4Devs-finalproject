import { Property } from '../entity/property';
import { Analysis } from '../entity/analysis';
import { EventBus } from '../../../shared/domain/event-bus';
import { PropertyUpdatedEvent } from '../events/property-updated.event';

export class PropertyAggregate {
  private constructor(
    private readonly _property: Property,
    private readonly _eventBus: EventBus
  ) {}

  static create(property: Property, eventBus: EventBus): PropertyAggregate {
    return new PropertyAggregate(property, eventBus);
  }

  get property(): Property {
    return this._property;
  }

  getAnalyses(): Analysis[] {
    return this._property.analyses;
  }

  getLatestAnalysis(): Analysis | null {
    const analyses = this.getAnalyses();
    if (analyses.length === 0) {
      return null;
    }
    return analyses[analyses.length - 1];
  }

  calculateAverageRoi(): number {
    return this._property.calculateAverageRoi();
  }

  addAnalysis(analysis: Analysis): void {
    this._property.addAnalysis(analysis);
    this._eventBus.publish(new PropertyUpdatedEvent(this._property.id));
  }
} 

export { Property };
