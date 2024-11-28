import { PropertyRepository } from '../../../domain/property/repository/property.repository';
import { Property } from '../../../domain/property/entity/property';
import { PropertyNotFoundError } from './errors/property-not-found.error';

export class GetPropertyByIdUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository
  ) {}

  async execute(id: string): Promise<Property> {
    try {
      const property = await this.propertyRepository.findById(id);

      if (!property) {
        throw new PropertyNotFoundError(id);
      }

      return property;
    } catch (error: unknown) {
      if (error instanceof PropertyNotFoundError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw new Error(`Error al buscar la propiedad: ${error.message}`);
      }
      
      throw new Error('Error desconocido al buscar la propiedad');
    }
  }
} 