import { Investment } from '../entity/investment';
import { InvestmentStatus } from '../types/investment-status';

describe('Investment Entity', () => {
  const mockValidProps = {
    investorId: 'mock-investor-id',
    propertyId: 'mock-property-id',
    amount: 250000,
    status: InvestmentStatus.INTERESTED,
    notes: 'Initial interest in property'
  };

  describe('create', () => {
    it('should create a valid investment', () => {
      const investment = Investment.create(mockValidProps);

      expect(investment).toBeInstanceOf(Investment);
      expect(investment.id).toBeDefined();
      expect(investment.investorId).toBe(mockValidProps.investorId);
      expect(investment.propertyId).toBe(mockValidProps.propertyId);
      expect(investment.amount).toBe(mockValidProps.amount);
      expect(investment.status).toBe(InvestmentStatus.INTERESTED);
    });

    it('should throw error for non-positive amount', () => {
      expect(() => Investment.create({ ...mockValidProps, amount: 0 }))
        .toThrow('El monto de inversión debe ser positivo');
      
      expect(() => Investment.create({ ...mockValidProps, amount: -1 }))
        .toThrow('El monto de inversión debe ser positivo');
    });
  });

  describe('process', () => {
    it('should change status to IN_PROCESS when current status is INTERESTED', () => {
      const investment = Investment.create(mockValidProps);
      investment.process();

      expect(investment.status).toBe(InvestmentStatus.IN_PROCESS);
    });

    it('should throw error when trying to process non-INTERESTED investment', () => {
      const investment = Investment.create({
        ...mockValidProps,
        status: InvestmentStatus.IN_PROCESS
      });

      expect(() => investment.process())
        .toThrow('Solo se pueden procesar inversiones en estado interesado');
    });
  });

  describe('complete', () => {
    it('should change status to COMPLETED when current status is IN_PROCESS', () => {
      const investment = Investment.create({
        ...mockValidProps,
        status: InvestmentStatus.IN_PROCESS
      });
      investment.complete();

      expect(investment.status).toBe(InvestmentStatus.COMPLETED);
    });

    it('should throw error when trying to complete non-IN_PROCESS investment', () => {
      const investment = Investment.create(mockValidProps); // INTERESTED status

      expect(() => investment.complete())
        .toThrow('Solo se pueden completar inversiones en proceso');
    });
  });

  describe('cancel', () => {
    it('should change status to CANCELLED', () => {
      const investment = Investment.create(mockValidProps);
      investment.cancel('Changed mind');

      expect(investment.status).toBe(InvestmentStatus.CANCELLED);
      expect(investment.notes).toContain('Changed mind');
    });

    it('should throw error when trying to cancel COMPLETED investment', () => {
      const investment = Investment.create({
        ...mockValidProps,
        status: InvestmentStatus.COMPLETED
      });

      expect(() => investment.cancel())
        .toThrow('No se pueden cancelar inversiones completadas');
    });
  });

  describe('addNote', () => {
    it('should add first note correctly', () => {
      const investment = Investment.create({
        ...mockValidProps,
        notes: undefined
      });
      
      investment.addNote('New note');
      expect(investment.notes).toBe('New note');
    });

    it('should append note to existing notes', () => {
      const investment = Investment.create(mockValidProps);
      investment.addNote('Additional note');

      expect(investment.notes).toContain('Initial interest in property');
      expect(investment.notes).toContain('Additional note');
    });
  });

  describe('timestamps', () => {
    it('should update timestamps on status changes', () => {
      jest.setSystemTime(new Date('2024-01-01')); // Establecemos una fecha inicial
      const investment = Investment.create(mockValidProps);
      const initialUpdatedAt = investment.updatedAt.getTime();

      jest.setSystemTime(new Date('2024-01-02')); // Avanzamos un día
      investment.process();

      expect(investment.updatedAt.getTime()).toBeGreaterThan(initialUpdatedAt);
      expect(investment.createdAt.getTime()).toBe(initialUpdatedAt); // La fecha de creación no debe cambiar
    });
  });
}); 