interface PropertyFeaturesProps {
  rooms: number;
  bathrooms: number;
  squareMeters: number;
  hasParking: boolean;
}

export class PropertyFeatures {
  private readonly props: PropertyFeaturesProps;

  private constructor(props: PropertyFeaturesProps) {
    this.validateProps(props);
    this.props = props;
  }

  public static create(props: PropertyFeaturesProps): PropertyFeatures {
    return new PropertyFeatures(props);
  }

  private validateProps(props: PropertyFeaturesProps): void {
    if (props.rooms < 0) {
      throw new Error('El número de habitaciones no puede ser negativo');
    }
    if (props.bathrooms < 0) {
      throw new Error('El número de baños no puede ser negativo');
    }
    if (props.squareMeters <= 0) {
      throw new Error('Los metros cuadrados deben ser positivos');
    }
  }

  get rooms(): number { return this.props.rooms; }
  get bathrooms(): number { return this.props.bathrooms; }
  get squareMeters(): number { return this.props.squareMeters; }
  get hasParking(): boolean { return this.props.hasParking; }
} 