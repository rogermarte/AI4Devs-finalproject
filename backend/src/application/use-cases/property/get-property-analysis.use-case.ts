import { PropertyRepository } from '../../../domain/property/repository/property.repository';
import { Analysis } from '../../../domain/property/entity/analysis';
import { PropertyNotFoundError } from './errors/property-not-found.error';

export class GetPropertyAnalysisUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepository
  ) {}

  async execute(propertyId: string): Promise<Analysis[]> {
    try {
      const property = await this.propertyRepository.findById(propertyId);

      if (!property) {
        throw new PropertyNotFoundError(propertyId);
      }

      return property.getAnalysis();
    } catch (error: unknown) {
      if (error instanceof PropertyNotFoundError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw new Error(`Error al obtener análisis: ${error.message}`);
      }
      
      throw new Error('Error desconocido al obtener análisis');
    }
  }
} 