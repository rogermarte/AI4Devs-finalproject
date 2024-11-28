import { PropertyRepository } from '../../../domain/property/repository/property.repository';
import { Property } from '../../../domain/property/entity/property';
import { PropertyStatus } from '../../../domain/property/types/property-status';

export class GetPropertiesByStatusUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository
  ) {}

  async execute(status: PropertyStatus): Promise<Property[]> {
    try {
      return await this.propertyRepository.findByStatus(status);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al buscar propiedades: ${error.message}`);
      }
      throw new Error('Error desconocido al buscar propiedades');
    }
  }
} 