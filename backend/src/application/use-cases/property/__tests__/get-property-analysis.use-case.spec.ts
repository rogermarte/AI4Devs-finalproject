import { GetPropertyAnalysisUseCase } from '../get-property-analysis.use-case';
import { PropertyRepository } from '../../../../domain/property/repository/property.repository';
import { Property } from '../../../../domain/property/entity/property';
import { PropertyType } from '../../../../domain/property/types/property-type';
import { PropertyFeatures } from '../../../../domain/property/value-objects/property-features';
import { PropertyNotFoundError } from '../errors/property-not-found.error';
import { Analysis } from '../../../../domain/property/entity/analysis';
import { FinancialMetrics } from '../../../../domain/property/value-objects/financial-metrics';

describe('GetPropertyAnalysisUseCase', () => {
  let useCase: GetPropertyAnalysisUseCase;
  let mockPropertyRepository: jest.Mocked<PropertyRepository>;

  const createMockProperty = () => {
    const property = Property.create({
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

    const analysis = Analysis.create({
      propertyId: property.id,
      monthlyIncome: 2000,
      expenses: 500,
      roi: 5.2,
      financialMetrics: FinancialMetrics.create({
        irr: 8.5,
        roi: 5.2,
        paybackPeriod: 15,
        occupancyRate: 85
      })
    });

    property.addAnalysis(analysis);
    return property;
  };

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

    useCase = new GetPropertyAnalysisUseCase(mockPropertyRepository);
  });

  it('should return property analysis when property exists', async () => {
    const mockProperty = createMockProperty();
    mockPropertyRepository.findById.mockResolvedValue(mockProperty);

    const result = await useCase.execute(mockProperty.id);

    expect(result).toHaveLength(1);
    expect(result[0].monthlyIncome).toBe(2000);
    expect(result[0].expenses).toBe(500);
    expect(result[0].netIncome).toBe(1500);
    expect(result[0].annualReturn).toBe(18000);
  });

  it('should throw error when property does not exist', async () => {
    mockPropertyRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id'))
      .rejects
      .toThrow(PropertyNotFoundError);
  });

  it('should return empty array when property has no analysis', async () => {
    const property = Property.create({
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

    mockPropertyRepository.findById.mockResolvedValue(property);

    const result = await useCase.execute(property.id);

    expect(result).toHaveLength(0);
  });
}); 