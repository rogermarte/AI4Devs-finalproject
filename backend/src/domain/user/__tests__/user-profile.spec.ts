import { UserProfile } from '../value-objects/user-profile';

describe('UserProfile Value Object', () => {
  const validProps = {
    firstName: 'John',
    lastName: 'Doe',
    phone: '+34666555444',
    bio: 'Professional investor with 10 years of experience',
    companyName: 'Real Estate Investments Ltd',
    position: 'Senior Investment Advisor',
    website: 'www.example.com'
  };

  describe('creation', () => {
    it('should create valid user profile', () => {
      const profile = UserProfile.create(validProps);

      expect(profile.firstName).toBe(validProps.firstName);
      expect(profile.lastName).toBe(validProps.lastName);
      expect(profile.fullName).toBe(`${validProps.firstName} ${validProps.lastName}`);
      expect(profile.phone).toBe(validProps.phone);
      expect(profile.bio).toBe(validProps.bio);
      expect(profile.companyName).toBe(validProps.companyName);
      expect(profile.position).toBe(validProps.position);
      expect(profile.website).toBe(validProps.website);
    });

    it('should create profile with minimal required props', () => {
      const minimalProps = {
        firstName: 'John',
        lastName: 'Doe'
      };

      const profile = UserProfile.create(minimalProps);
      expect(profile.firstName).toBe(minimalProps.firstName);
      expect(profile.lastName).toBe(minimalProps.lastName);
    });
  });

  describe('validation', () => {
    describe('names', () => {
      it('should throw error for empty first name', () => {
        expect(() => UserProfile.create({
          ...validProps,
          firstName: ''
        })).toThrow('El nombre y apellido son requeridos');

        expect(() => UserProfile.create({
          ...validProps,
          firstName: '   '
        })).toThrow('El nombre y apellido son requeridos');
      });

      it('should throw error for empty last name', () => {
        expect(() => UserProfile.create({
          ...validProps,
          lastName: ''
        })).toThrow('El nombre y apellido son requeridos');
      });

      it('should throw error for too long names', () => {
        const longName = 'a'.repeat(51);
        expect(() => UserProfile.create({
          ...validProps,
          firstName: longName
        })).toThrow('El nombre o apellido son demasiado largos');

        expect(() => UserProfile.create({
          ...validProps,
          lastName: longName
        })).toThrow('El nombre o apellido son demasiado largos');
      });
    });

    describe('phone', () => {
      it('should throw error for invalid phone format', () => {
        expect(() => UserProfile.create({
          ...validProps,
          phone: 'invalid'
        })).toThrow('Formato de teléfono inválido');

        expect(() => UserProfile.create({
          ...validProps,
          phone: '123'
        })).toThrow('Formato de teléfono inválido');
      });

      it('should accept valid phone formats', () => {
        const validPhones = [
          '+34666555444',
          '666555444',
          '+1-555-555-5555',
          '+44 7911 123456'
        ];

        validPhones.forEach(phone => {
          expect(() => UserProfile.create({
            ...validProps,
            phone
          })).not.toThrow();
        });
      });
    });

    describe('bio', () => {
      it('should throw error for too long bio', () => {
        expect(() => UserProfile.create({
          ...validProps,
          bio: 'a'.repeat(501)
        })).toThrow('La biografía no puede exceder los 500 caracteres');
      });
    });

    describe('company', () => {
      it('should throw error for empty company name', () => {
        expect(() => UserProfile.create({
          ...validProps,
          companyName: ''
        })).toThrow('El nombre de la empresa no puede estar vacío');

        expect(() => UserProfile.create({
          ...validProps,
          companyName: '   '
        })).toThrow('El nombre de la empresa no puede estar vacío');
      });

      it('should allow undefined company name', () => {
        expect(() => UserProfile.create({
          firstName: 'John',
          lastName: 'Doe',
          companyName: undefined
        })).not.toThrow();
      });

      it('should throw error for too long company name', () => {
        expect(() => UserProfile.create({
          ...validProps,
          companyName: 'a'.repeat(101)
        })).toThrow('El nombre de la empresa es demasiado largo');
      });
    });
  });

  describe('update', () => {
    it('should validate updates', () => {
      const profile = UserProfile.create({
        firstName: 'John',
        lastName: 'Doe'
      });

      // Validación de nombres vacíos
      expect(() => profile.update({
        firstName: ''
      })).toThrow('El nombre y apellido son requeridos');

      expect(() => profile.update({
        firstName: '   '
      })).toThrow('El nombre y apellido son requeridos');

      expect(() => profile.update({
        lastName: ''
      })).toThrow('El nombre y apellido son requeridos');

      // Validación de teléfono inválido
      expect(() => profile.update({
        phone: 'invalid'
      })).toThrow('Formato de teléfono inválido');

      // Validación de nombre de empresa vacío
      expect(() => profile.update({
        companyName: ''
      })).toThrow('El nombre de la empresa no puede estar vacío');
    });

    it('should allow removing optional fields', () => {
      const profile = UserProfile.create({
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        companyName: 'Test Company'
      });

      expect(() => profile.update({
        phone: undefined,
        companyName: undefined
      })).not.toThrow();

      expect(profile.phone).toBeUndefined();
      expect(profile.companyName).toBeUndefined();
    });

    it('should update valid properties', () => {
      const profile = UserProfile.create({
        firstName: 'John',
        lastName: 'Doe'
      });

      const newProps = {
        firstName: 'Jane',
        phone: '+1234567890',
        bio: 'New bio'
      };

      profile.update(newProps);

      expect(profile.firstName).toBe(newProps.firstName);
      expect(profile.lastName).toBe('Doe'); // No cambia
      expect(profile.phone).toBe(newProps.phone);
      expect(profile.bio).toBe(newProps.bio);
    });
  });
}); 