import { Property } from '../../domain/property/entity/property';
import { PropertyFeatures } from '../../domain/property/value-objects/property-features';

export interface PropertyDTO {
  id: string;
  psiId: string;
  title: string;
  description: string;
  address: string;
  type: string;
  location: {
    city: string;
    neighborhood: string;
  };
  price: number;
  features: {
    rooms: number;
    bathrooms: number;
    squareMeters: number;
    hasParking: boolean;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export class PropertyMapper {
  static toDTO(property: Property): PropertyDTO {
    return {
      id: property.id,
      psiId: property.psiId,
      title: property.title,
      description: property.description,
      address: property.address,
      type: property.type,
      location: {
        city: property.location.city,
        neighborhood: property.location.neighborhood
      },
      price: property.price,
      features: {
        rooms: property.features.rooms,
        bathrooms: property.features.bathrooms,
        squareMeters: property.features.squareMeters,
        hasParking: property.features.hasParking
      },
      status: property.status,
      createdAt: property.createdAt.toISOString(),
      updatedAt: property.updatedAt.toISOString()
    };
  }

  static toDomain(dto: PropertyDTO): Property {
    return Property.create({
      psiId: dto.psiId,
      title: dto.title,
      description: dto.description,
      address: dto.address,
      type: dto.type as any, // Necesitamos validar el tipo aquí
      location: dto.location,
      price: dto.price,
      features: PropertyFeatures.create({
        rooms: dto.features.rooms,
        bathrooms: dto.features.bathrooms,
        squareMeters: dto.features.squareMeters,
        hasParking: dto.features.hasParking
      })
    });
  }
} 