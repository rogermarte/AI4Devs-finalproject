import { User } from '../entity/user';
import { UserProfile } from '../value-objects/user-profile';
import { UserRole, UserStatus } from '../types/user-role';

describe('User Entity', () => {
  const mockProfile = UserProfile.create({
    firstName: 'John',
    lastName: 'Doe'
  });

  const validProps = {
    email: 'john.doe@example.com',
    role: UserRole.INVESTOR,
    profile: mockProfile
  };

  describe('create', () => {
    it('should create a valid user', () => {
      const user = User.create(validProps);

      expect(user).toBeInstanceOf(User);
      expect(user.id).toBeDefined();
      expect(user.email).toBe(validProps.email);
      expect(user.role).toBe(validProps.role);
      expect(user.status).toBe(UserStatus.PENDING);
      expect(user.profile).toBe(mockProfile);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.verifiedAt).toBeUndefined();
      expect(user.lastLoginAt).toBeUndefined();
    });

    it('should throw error for invalid email', () => {
      expect(() => User.create({
        ...validProps,
        email: 'invalid-email'
      })).toThrow('Formato de email inválido');
    });

    it('should throw error for invalid role', () => {
      expect(() => User.create({
        ...validProps,
        role: 'INVALID_ROLE' as UserRole
      })).toThrow('Rol de usuario inválido');
    });
  });

  describe('status changes', () => {
    describe('verify', () => {
      it('should verify pending user', () => {
        const user = User.create(validProps);
        user.verify();

        expect(user.status).toBe(UserStatus.ACTIVE);
        expect(user.verifiedAt).toBeInstanceOf(Date);
      });

      it('should throw error when verifying non-pending user', () => {
        const user = User.create(validProps);
        user.verify();

        expect(() => user.verify())
          .toThrow('Solo se pueden verificar usuarios pendientes');
      });
    });

    describe('suspend', () => {
      it('should suspend active user', () => {
        const user = User.create(validProps);
        user.verify();
        user.suspend('Violation of terms');

        expect(user.status).toBe(UserStatus.SUSPENDED);
      });

      it('should throw error when suspending without reason', () => {
        const user = User.create(validProps);
        user.verify();

        expect(() => user.suspend('')).toThrow('Se requiere una razón para suspender al usuario');
      });

      it('should throw error when suspending already suspended user', () => {
        const user = User.create(validProps);
        user.verify();
        user.suspend('Reason');

        expect(() => user.suspend('Another reason'))
          .toThrow('El usuario ya está suspendido');
      });
    });

    describe('activate', () => {
      it('should activate suspended user', () => {
        const user = User.create(validProps);
        user.verify();
        user.suspend('Violation');
        user.activate();

        expect(user.status).toBe(UserStatus.ACTIVE);
      });

      it('should throw error when activating blocked user', () => {
        const user = User.create(validProps);
        user.block('Permanent block');

        expect(() => user.activate())
          .toThrow('No se puede activar un usuario bloqueado');
      });
    });

    describe('block', () => {
      it('should block user', () => {
        const user = User.create(validProps);
        user.block('Serious violation');

        expect(user.status).toBe(UserStatus.BLOCKED);
      });

      it('should throw error when blocking without reason', () => {
        const user = User.create(validProps);

        expect(() => user.block('')).toThrow('Se requiere una razón para bloquear al usuario');
      });
    });
  });

  describe('profile management', () => {
    it('should update profile', () => {
      const user = User.create(validProps);
      const newProfile = UserProfile.create({
        firstName: 'Jane',
        lastName: 'Doe'
      });

      user.updateProfile(newProfile);

      expect(user.profile).toBe(newProfile);
    });
  });

  describe('login tracking', () => {
    it('should record login time', () => {
      const user = User.create(validProps);
      user.recordLogin();

      expect(user.lastLoginAt).toBeInstanceOf(Date);
    });
  });
}); 