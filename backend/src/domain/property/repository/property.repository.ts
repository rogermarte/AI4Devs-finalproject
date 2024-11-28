import { Property } from '../entity/property';
import { PropertyStatus } from '../types/property-status';
import { SearchCriteria } from '../../../application/use-cases/property/search-properties.use-case';

export interface PropertyRepository {
  findById(id: string): Promise<Property | null>;
  findByPsiId(psiId: string): Promise<Property | null>;
  findAll(): Promise<Property[]>;
  findByStatus(status: PropertyStatus): Promise<Property[]>;
  search(criteria: SearchCriteria): Promise<Property[]>;
  save(property: Property): Promise<void>;
  delete(id: string): Promise<void>;
} 