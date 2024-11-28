import { PropertyAggregate } from '../aggregate/property-aggregate';
import { Property } from '../entity/property';
import { Analysis } from '../entity/analysis';
import { EventBus } from '../../../shared/domain/event-bus';
import { PropertyType } from '../types/property-type';
import { PropertyFeatures } from '../value-objects/property-features';
import { FinancialMetrics } from '../value-objects/financial-metrics';

describe('PropertyAggregate', () => {
  let eventBus: EventBus;
  let property: Property;
  let propertyAggregate: PropertyAggregate;

  beforeEach(() => {
    eventBus = {
      publish: jest.fn().mockImplementation(async () => {}),
      subscribe: jest.fn()
    };

    property = Property.create({
      psiId: 'test-psi-123',
      title: 'Test Property',
      description: 'Test Description',
      address: '123 Test St',
      type: PropertyType.HOUSE,
      location: {
        city: 'Test City',
        neighborhood: 'Test Neighborhood'
      },
      price: 100000,
      features: PropertyFeatures.create({
        rooms: 3,
        bathrooms: 2,
        squareMeters: 100,
        hasParking: true
      })
    });

    propertyAggregate = PropertyAggregate.create(property, eventBus);
  });

  describe('Analysis management', () => {
    it('should add analysis and publish event', () => {
      const financialMetrics = FinancialMetrics.create({
        irr: 12,
        roi: 8,
        paybackPeriod: 10,
        occupancyRate: 95
      });

      const analysis = Analysis.create({
        propertyId: property.id,
        monthlyIncome: 1000,
        expenses: 200,
        roi: financialMetrics.roi,
        financialMetrics: financialMetrics
      });

      propertyAggregate.addAnalysis(analysis);

      expect(propertyAggregate.getAnalyses()).toHaveLength(1);
      expect(propertyAggregate.getAnalyses()[0]).toBe(analysis);
      expect(propertyAggregate.calculateAverageRoi()).toBe(8);
      
      const publishMock = eventBus.publish as jest.Mock;
      expect(publishMock).toHaveBeenCalledWith(
        expect.objectContaining({
          eventName: expect.any(Function),
          aggregateId: property.id,
          occurredOn: expect.any(Date)
        })
      );
      
      const publishedEvent = publishMock.mock.calls[0][0];
      expect(publishedEvent.eventName()).toBe('PropertyUpdated');
    });
  });
}); 