import { PropertyRepository } from '../repository/property-repository.interface';
import { Property } from '../entity/property';

export class MockPropertyRepository implements PropertyRepository {
  private properties: Property[] = [];

  async save(property: Property): Promise<void> {
    this.properties.push(property);
  }

  async findById(id: string): Promise<Property | null> {
    return this.properties.find(p => p.id === id) || null;
  }

  async findByPsi(psiId: string): Promise<Property[]> {
    return this.properties.filter(p => p.psiId === psiId);
  }

  async findPublished(): Promise<Property[]> {
    return this.properties.filter(p => p.status === 'PUBLISHED');
  }

  async update(property: Property): Promise<void> {
    const index = this.properties.findIndex(p => p.id === property.id);
    if (index !== -1) {
      this.properties[index] = property;
    }
  }

  async delete(id: string): Promise<void> {
    this.properties = this.properties.filter(p => p.id !== id);
  }
} 