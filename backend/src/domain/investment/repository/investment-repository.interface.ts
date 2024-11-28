import { Investment } from '../entity/investment';
import { InvestmentStatus } from '../types/investment-status';

export interface InvestmentRepository {
  save(investment: Investment): Promise<void>;
  findById(id: string): Promise<Investment | null>;
  findByInvestor(investorId: string): Promise<Investment[]>;
  findByProperty(propertyId: string): Promise<Investment[]>;
  findByStatus(status: InvestmentStatus): Promise<Investment[]>;
  update(investment: Investment): Promise<void>;
  delete(id: string): Promise<void>;
} 