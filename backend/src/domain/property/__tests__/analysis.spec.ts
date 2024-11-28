import { Analysis } from '../entity/analysis';
import { FinancialMetrics } from '../value-objects/financial-metrics';

describe('Analysis Entity', () => {
  const validProps = {
    propertyId: 'test-property-id',
    monthlyIncome: 2000,
    expenses: 500,
    roi: 5.2,
    financialMetrics: FinancialMetrics.create({
      irr: 12,
      roi: 8.5,
      paybackPeriod: 10,
      occupancyRate: 95
    })
  };

  describe('create', () => {
    it('should create a valid analysis', () => {
      const analysis = Analysis.create(validProps);
      expect(analysis.monthlyIncome).toBe(2000);
      expect(analysis.expenses).toBe(500);
      expect(analysis.netIncome).toBe(1500);
      expect(analysis.annualReturn).toBe(18000);
    });

    it('should calculate net income correctly', () => {
      const analysis = Analysis.create(validProps);
      expect(analysis.netIncome).toBe(1500);
    });

    it('should calculate annual return correctly', () => {
      const analysis = Analysis.create(validProps);
      expect(analysis.annualReturn).toBe(18000);
    });
  });

  describe('validation', () => {
    it('should throw error for negative ROI', () => {
      expect(() => Analysis.create({
        ...validProps,
        roi: -1
      })).toThrow('ROI no puede ser negativo');
    });

    it('should throw error for negative monthly income', () => {
      expect(() => Analysis.create({
        ...validProps,
        monthlyIncome: -1
      })).toThrow('El ingreso mensual no puede ser negativo');
    });

    it('should throw error for negative expenses', () => {
      expect(() => Analysis.create({
        ...validProps,
        expenses: -1
      })).toThrow('Los gastos no pueden ser negativos');
    });
  });
}); 