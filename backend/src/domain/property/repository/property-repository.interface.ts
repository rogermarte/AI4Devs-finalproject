import { Property } from "../entity/property";

export interface PropertyRepository {
  save(property: Property): Promise<void>;
  findById(id: string): Promise<Property | null>;
  findByPsi(psiId: string): Promise<Property[]>;
  findPublished(): Promise<Property[]>;
  update(property: Property): Promise<void>;
  delete(id: string): Promise<void>;
} 