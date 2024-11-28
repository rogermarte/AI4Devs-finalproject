import { UserRole, UserStatus } from '../types/user-role';
import { UserProfile } from '../value-objects/user-profile';

interface UserProps {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profile: UserProfile;
  verifiedAt?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserProps;

  private constructor(props: UserProps) {
    this.validateEmail(props.email);
    this.validateRole(props.role);
    this.validateStatus(props.status);
    this.props = { ...props };
  }

  public static create(props: Omit<UserProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): User {
    return new User({
      ...props,
      id: crypto.randomUUID(),
      status: UserStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Formato de email inválido');
    }
  }

  private validateRole(role: UserRole): void {
    if (!Object.values(UserRole).includes(role)) {
      throw new Error('Rol de usuario inválido');
    }
  }

  private validateStatus(status: UserStatus): void {
    if (!Object.values(UserStatus).includes(status)) {
      throw new Error('Estado de usuario inválido');
    }
  }

  // Getters
  get id(): string { return this.props.id; }
  get email(): string { return this.props.email; }
  get role(): UserRole { return this.props.role; }
  get status(): UserStatus { return this.props.status; }
  get profile(): UserProfile { return this.props.profile; }
  get verifiedAt(): Date | undefined { return this.props.verifiedAt; }
  get lastLoginAt(): Date | undefined { return this.props.lastLoginAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  // Métodos de dominio
  public verify(): void {
    if (this.props.status !== UserStatus.PENDING) {
      throw new Error('Solo se pueden verificar usuarios pendientes');
    }
    this.props.status = UserStatus.ACTIVE;
    this.props.verifiedAt = new Date();
    this.props.updatedAt = new Date();
  }

  public suspend(reason: string): void {
    if (this.props.status === UserStatus.SUSPENDED) {
      throw new Error('El usuario ya está suspendido');
    }
    if (!reason.trim()) {
      throw new Error('Se requiere una razón para suspender al usuario');
    }
    this.props.status = UserStatus.SUSPENDED;
    this.props.updatedAt = new Date();
  }

  public activate(): void {
    if (this.props.status === UserStatus.ACTIVE) {
      throw new Error('El usuario ya está activo');
    }
    if (this.props.status === UserStatus.BLOCKED) {
      throw new Error('No se puede activar un usuario bloqueado');
    }
    this.props.status = UserStatus.ACTIVE;
    this.props.updatedAt = new Date();
  }

  public block(reason: string): void {
    if (this.props.status === UserStatus.BLOCKED) {
      throw new Error('El usuario ya está bloqueado');
    }
    if (!reason?.trim()) {
      throw new Error('Se requiere una razón para bloquear al usuario');
    }
    this.props.status = UserStatus.BLOCKED;
    this.props.updatedAt = new Date();
  }

  public updateProfile(profile: UserProfile): void {
    this.props.profile = profile;
    this.props.updatedAt = new Date();
  }

  public recordLogin(): void {
    this.props.lastLoginAt = new Date();
    this.props.updatedAt = new Date();
  }
} 