import { FinancialMetrics } from '../value-objects/financial-metrics';

interface AnalysisProps {
  id?: string;
  propertyId: string;
  monthlyIncome: number;
  expenses: number;
  roi: number;
  financialMetrics: FinancialMetrics;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Analysis {
  private constructor(
    private readonly _id: string,
    private readonly _propertyId: string,
    private readonly _monthlyIncome: number,
    private readonly _expenses: number,
    private readonly _roi: number,
    private readonly _financialMetrics: FinancialMetrics,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date
  ) {
    this.validate();
  }

  static create(props: Omit<AnalysisProps, 'id' | 'createdAt' | 'updatedAt'>): Analysis {
    const now = new Date();
    return new Analysis(
      crypto.randomUUID(),
      props.propertyId,
      props.monthlyIncome,
      props.expenses,
      props.roi,
      props.financialMetrics,
      now,
      now
    );
  }

  get id(): string {
    return this._id;
  }

  get propertyId(): string {
    return this._propertyId;
  }

  get monthlyIncome(): number {
    return this._monthlyIncome;
  }

  get expenses(): number {
    return this._expenses;
  }

  get roi(): number {
    return this._roi;
  }

  get netIncome(): number {
    return this._monthlyIncome - this._expenses;
  }

  get annualReturn(): number {
    return this.netIncome * 12;
  }

  get financialMetrics(): FinancialMetrics {
    return this._financialMetrics;
  }

  private validate(): void {
    if (this._monthlyIncome < 0) {
      throw new Error('El ingreso mensual no puede ser negativo');
    }

    if (this._expenses < 0) {
      throw new Error('Los gastos no pueden ser negativos');
    }

    if (this._roi < 0) {
      throw new Error('ROI no puede ser negativo');
    }
  }
} 