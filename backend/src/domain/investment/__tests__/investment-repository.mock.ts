import { InvestmentRepository } from '../repository/investment-repository.interface';
import { Investment } from '../entity/investment';
import { InvestmentStatus } from '../types/investment-status';

export class MockInvestmentRepository implements InvestmentRepository {
  private investments: Investment[] = [];

  async save(investment: Investment): Promise<void> {
    this.investments.push(investment);
  }

  async findById(id: string): Promise<Investment | null> {
    return this.investments.find(i => i.id === id) || null;
  }

  async findByInvestor(investorId: string): Promise<Investment[]> {
    return this.investments.filter(i => i.investorId === investorId);
  }

  async findByProperty(propertyId: string): Promise<Investment[]> {
    return this.investments.filter(i => i.propertyId === propertyId);
  }

  async findByStatus(status: InvestmentStatus): Promise<Investment[]> {
    return this.investments.filter(i => i.status === status);
  }

  async update(investment: Investment): Promise<void> {
    const index = this.investments.findIndex(i => i.id === investment.id);
    if (index !== -1) {
      this.investments[index] = investment;
    }
  }

  async delete(id: string): Promise<void> {
    this.investments = this.investments.filter(i => i.id !== id);
  }
} 