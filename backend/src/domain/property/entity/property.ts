import { PropertyStatus } from '../types/property-status';
import { PropertyType } from '../types/property-type';
import { PropertyFeatures } from '../value-objects/property-features';
import { Analysis } from '../entity/analysis';

interface PropertyProps {
  id: string;
  psiId: string;
  title: string;
  description: string;
  address: string;
  type: PropertyType;
  location: {
    city: string;
    neighborhood: string;
  };
  price: number;
  features: PropertyFeatures;
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Property {
  private _title: string;
  private _description: string;
  private _price: number;
  private _updatedAt: Date;
  private _analysis: Analysis[] = [];

  constructor(
    private readonly _id: string,
    private readonly _psiId: string,
    title: string,
    description: string,
    private readonly _address: string,
    private readonly _type: PropertyType,
    private readonly _location: {
      city: string;
      neighborhood: string;
    },
    price: number,
    private readonly _features: PropertyFeatures,
    private _status: PropertyStatus = PropertyStatus.DRAFT,
    private readonly _createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._title = title;
    this._description = description;
    this._price = price;
    this._updatedAt = updatedAt;
  }

  // Getters
  get id(): string { return this._id; }
  get psiId(): string { return this._psiId; }
  get title(): string { return this._title; }
  get description(): string { return this._description; }
  get address(): string { return this._address; }
  get type(): PropertyType { return this._type; }
  get location(): { city: string; neighborhood: string; } { return this._location; }
  get price(): number { return this._price; }
  get features(): PropertyFeatures { return this._features; }
  get status(): PropertyStatus { return this._status; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }
  getAnalysis(): Analysis[] {
    return this._analysis;
  }

  get analyses(): Analysis[] {
    return [...this._analysis];
  }

  calculateAverageRoi(): number {
    if (this._analysis.length === 0) return 0;
    const totalRoi = this._analysis.reduce((sum, analysis) => sum + analysis.roi, 0);
    return totalRoi / this._analysis.length;
  }

  // Update methods
  updateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('El título no puede estar vacío');
    }
    if (title.length > 100) {
      throw new Error('El título no puede exceder los 100 caracteres');
    }
    this._title = title;
    this._updatedAt = new Date();
  }

  updateDescription(description: string): void {
    if (description && description.length > 500) {
      throw new Error('La descripción no puede exceder los 500 caracteres');
    }
    this._description = description;
    this._updatedAt = new Date();
  }

  updatePrice(price: number): void {
    if (price <= 0) {
      throw new Error('El precio debe ser positivo');
    }
    this._price = price;
    this._updatedAt = new Date();
  }

  // Existing methods
  publish(): void {
    if (this._status !== PropertyStatus.DRAFT) {
      throw new Error('Solo se pueden publicar propiedades en estado borrador');
    }
    this._status = PropertyStatus.PUBLISHED;
    this._updatedAt = new Date();
  }

  reserve(): void {
    if (this._status !== PropertyStatus.PUBLISHED) {
      throw new Error('Solo se pueden reservar propiedades publicadas');
    }
    this._status = PropertyStatus.RESERVED;
    this._updatedAt = new Date();
  }

  // Factory method
  static create(props: {
    psiId: string;
    title: string;
    description: string;
    address: string;
    type: PropertyType;
    location: {
      city: string;
      neighborhood: string;
    };
    price: number;
    features: PropertyFeatures;
  }): Property {
    return new Property(
      crypto.randomUUID(),
      props.psiId,
      props.title,
      props.description,
      props.address,
      props.type,
      props.location,
      props.price,
      props.features
    );
  }

  // Añadimos el método para agregar análisis
  addAnalysis(analysis: Analysis): void {
    this._analysis.push(analysis);
    this._updatedAt = new Date();
  }
} 