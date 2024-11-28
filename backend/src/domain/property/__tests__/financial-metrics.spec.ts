import { FinancialMetrics } from '../value-objects/financial-metrics';

describe('FinancialMetrics Value Object', () => {
  const validProps = {
    irr: 12,
    roi: 8.5,
    paybackPeriod: 10,
    occupancyRate: 95
  };

  describe('creation', () => {
    it('should create valid financial metrics', () => {
      const metrics = FinancialMetrics.create(validProps);
      expect(metrics.irr).toBe(12);
      expect(metrics.roi).toBe(8.5);
      expect(metrics.paybackPeriod).toBe(10);
      expect(metrics.occupancyRate).toBe(95);
    });
  });

  describe('validation', () => {
    it('should throw error for IRR less than -100', () => {
      expect(() => FinancialMetrics.create({ ...validProps, irr: -101 }))
        .toThrow('IRR no puede ser menor que -100%');
    });

    it('should throw error for zero or negative payback period', () => {
      expect(() => FinancialMetrics.create({ ...validProps, paybackPeriod: 0 }))
        .toThrow('El período de recuperación debe ser positivo');

      expect(() => FinancialMetrics.create({ ...validProps, paybackPeriod: -1 }))
        .toThrow('El período de recuperación debe ser positivo');
    });

    it('should throw error for invalid occupancy rate', () => {
      expect(() => FinancialMetrics.create({ ...validProps, occupancyRate: -1 }))
        .toThrow('La tasa de ocupación debe estar entre 0 y 100');

      expect(() => FinancialMetrics.create({ ...validProps, occupancyRate: 101 }))
        .toThrow('La tasa de ocupación debe estar entre 0 y 100');
    });
  });
}); 