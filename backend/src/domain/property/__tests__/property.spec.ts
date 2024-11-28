import { Property } from '../entity/property';
import { PropertyFeatures } from '../value-objects/property-features';
import { PropertyStatus } from '../types/property-status';
import { PropertyType } from '../types/property-type';

describe('Property Entity', () => {
  const mockValidProps = {
    psiId: 'mock-psi-id',
    title: 'Apartamento en Barcelona',
    description: 'Hermoso apartamento',
    address: 'Calle Test 123',
    type: PropertyType.APARTMENT,
    location: {
      city: 'Barcelona',
      neighborhood: 'Eixample'
    },
    price: 350000,
    features: PropertyFeatures.create({
      rooms: 2,
      bathrooms: 1,
      squareMeters: 85,
      hasParking: true
    })
  };

  describe('create', () => {
    it('should create a valid property', () => {
      const property = Property.create(mockValidProps);

      expect(property).toBeInstanceOf(Property);
      expect(property.id).toBeDefined();
      expect(property.title).toBe(mockValidProps.title);
    });

    it('should set default values for dates and status', () => {
      const property = Property.create(mockValidProps);

      expect(property.status).toBe(PropertyStatus.DRAFT);
      expect(property.createdAt).toBeInstanceOf(Date);
      expect(property.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('publish', () => {
    it('should throw error when trying to publish a non-DRAFT property', () => {
      const property = Property.create(mockValidProps);
      property.publish();
      
      expect(() => property.publish()).toThrow('Solo se pueden publicar propiedades en estado borrador');
    });
  });

  describe('reserve', () => {
    it('should change status to RESERVED when current status is PUBLISHED', () => {
      const property = Property.create(mockValidProps);
      property.publish();
      property.reserve();
      
      expect(property.status).toBe(PropertyStatus.RESERVED);
    });
  });

  describe('Property updates', () => {
    let property: Property;

    beforeEach(() => {
      property = Property.create({
        psiId: 'test-123',
        title: 'Original Title',
        description: 'Original Description',
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
    });

    describe('updateTitle', () => {
      it('should update title with valid value', () => {
        property.updateTitle('New Title');
        expect(property.title).toBe('New Title');
      });

      it('should throw error for empty title', () => {
        expect(() => property.updateTitle('')).toThrow('El título no puede estar vacío');
      });

      it('should throw error for too long title', () => {
        expect(() => property.updateTitle('a'.repeat(101))).toThrow('El título no puede exceder los 100 caracteres');
      });
    });

    describe('updateDescription', () => {
      it('should update description with valid value', () => {
        property.updateDescription('New Description');
        expect(property.description).toBe('New Description');
      });

      it('should allow empty description', () => {
        property.updateDescription('');
        expect(property.description).toBe('');
      });

      it('should throw error for too long description', () => {
        expect(() => property.updateDescription('a'.repeat(501))).toThrow('La descripción no puede exceder los 500 caracteres');
      });
    });

    describe('updatePrice', () => {
      it('should update price with valid value', () => {
        property.updatePrice(350000);
        expect(property.price).toBe(350000);
      });

      it('should throw error for negative or zero price', () => {
        expect(() => property.updatePrice(0)).toThrow('El precio debe ser positivo');
        expect(() => property.updatePrice(-1000)).toThrow('El precio debe ser positivo');
      });
    });
  });
}); 