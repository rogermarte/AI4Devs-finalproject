interface UserProfileProps {
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  companyName?: string;
  position?: string;
  website?: string;
}

export class UserProfile {
  private props: UserProfileProps;

  private constructor(props: UserProfileProps) {
    this.validateNames(props.firstName, props.lastName);
    if (props.phone) this.validatePhone(props.phone);
    if (props.bio) this.validateBio(props.bio);
    if (props.companyName !== undefined) this.validateCompanyName(props.companyName);
    this.props = { ...props };
  }

  public static create(props: UserProfileProps): UserProfile {
    return new UserProfile(props);
  }

  private validateNames(firstName: string, lastName: string): void {
    if (!firstName?.trim() || !lastName?.trim()) {
      throw new Error('El nombre y apellido son requeridos');
    }
    if (firstName.length > 50 || lastName.length > 50) {
      throw new Error('El nombre o apellido son demasiado largos');
    }
  }

  private validatePhone(phone: string): void {
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error('Formato de teléfono inválido');
    }
  }

  private validateBio(bio: string): void {
    if (bio.length > 500) {
      throw new Error('La biografía no puede exceder los 500 caracteres');
    }
  }

  private validateCompanyName(companyName: string): void {
    if (companyName === undefined) return;
    
    if (!companyName.trim()) {
      throw new Error('El nombre de la empresa no puede estar vacío');
    }
    if (companyName.length > 100) {
      throw new Error('El nombre de la empresa es demasiado largo');
    }
  }

  get firstName(): string { return this.props.firstName; }
  get lastName(): string { return this.props.lastName; }
  get fullName(): string { return `${this.props.firstName} ${this.props.lastName}`; }
  get phone(): string | undefined { return this.props.phone; }
  get bio(): string | undefined { return this.props.bio; }
  get companyName(): string | undefined { return this.props.companyName; }
  get position(): string | undefined { return this.props.position; }
  get website(): string | undefined { return this.props.website; }

  public update(props: Partial<UserProfileProps>): void {
    const newFirstName = props.firstName !== undefined ? props.firstName : this.props.firstName;
    const newLastName = props.lastName !== undefined ? props.lastName : this.props.lastName;
    
    if (props.firstName !== undefined || props.lastName !== undefined) {
      this.validateNames(newFirstName, newLastName);
    }
    
    if (props.phone !== undefined) {
      if (props.phone) this.validatePhone(props.phone);
    }
    
    if (props.bio !== undefined) {
      if (props.bio) this.validateBio(props.bio);
    }
    
    if (props.companyName !== undefined) {
      this.validateCompanyName(props.companyName);
    }

    this.props = {
      ...this.props,
      ...props,
      firstName: newFirstName,
      lastName: newLastName
    };
  }
} 