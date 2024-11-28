import { PropertyFeatures } from '../value-objects/property-features';

describe('PropertyFeatures Value Object', () => {
  describe('creation', () => {
    it('should create valid property features', () => {
      const features = PropertyFeatures.create({
        rooms: 2,
        bathrooms: 1,
        squareMeters: 80,
        hasParking: true
      });

      expect(features.rooms).toBe(2);
      expect(features.bathrooms).toBe(1);
      expect(features.squareMeters).toBe(80);
      expect(features.hasParking).toBe(true);
    });
  });

  describe('validation', () => {
    it('should throw error for negative rooms', () => {
      expect(() => PropertyFeatures.create({
        rooms: -1,
        bathrooms: 1,
        squareMeters: 80,
        hasParking: true
      })).toThrow('El número de habitaciones no puede ser negativo');
    });

    it('should throw error for negative bathrooms', () => {
      expect(() => PropertyFeatures.create({
        rooms: 2,
        bathrooms: -1,
        squareMeters: 80,
        hasParking: true
      })).toThrow('El número de baños no puede ser negativo');
    });

    it('should throw error for non-positive square meters', () => {
      expect(() => PropertyFeatures.create({
        rooms: 2,
        bathrooms: 1,
        squareMeters: 0,
        hasParking: true
      })).toThrow('Los metros cuadrados deben ser positivos');
    });
  });
}); 