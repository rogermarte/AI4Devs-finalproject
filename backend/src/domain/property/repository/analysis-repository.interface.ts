import { Analysis } from '../entity/analysis';

export interface AnalysisRepository {
  save(analysis: Analysis): Promise<void>;
  findByPropertyId(propertyId: string): Promise<Analysis[]>;
  findById(id: string): Promise<Analysis | null>;
  update(analysis: Analysis): Promise<void>;
  delete(id: string): Promise<void>;
} 