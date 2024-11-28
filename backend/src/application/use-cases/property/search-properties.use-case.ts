import { PropertyRepository } from '../../../domain/property/repository/property.repository';
import { Property } from '../../../domain/property/entity/property';
import { PropertyType } from '../../../domain/property/types/property-type';
import { PropertyStatus } from '../../../domain/property/types/property-status';

export interface SearchCriteria {
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  type?: PropertyType;
  minRooms?: number;
  status?: PropertyStatus;
}

export class SearchPropertiesUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository
  ) {}

  async execute(criteria: SearchCriteria): Promise<Property[]> {
    try {
      this.validateCriteria(criteria);
      return await this.propertyRepository.search(criteria);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al buscar propiedades: ${error.message}`);
      }
      throw new Error('Error desconocido al buscar propiedades');
    }
  }

  private validateCriteria(criteria: SearchCriteria): void {
    if (criteria.minPrice && criteria.maxPrice && criteria.minPrice > criteria.maxPrice) {
      throw new Error('El precio mínimo no puede ser mayor que el precio máximo');
    }

    if (criteria.minPrice && criteria.minPrice < 0) {
      throw new Error('El precio mínimo no puede ser negativo');
    }

    if (criteria.maxPrice && criteria.maxPrice < 0) {
      throw new Error('El precio máximo no puede ser negativo');
    }

    if (criteria.minRooms && criteria.minRooms < 0) {
      throw new Error('El número mínimo de habitaciones no puede ser negativo');
    }
  }
} 