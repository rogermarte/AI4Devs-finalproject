import { InvestmentStatus } from '../types/investment-status';

interface InvestmentProps {
  id: string;
  investorId: string;
  propertyId: string;
  amount: number;
  status: InvestmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Investment {
  private props: InvestmentProps;

  private constructor(props: InvestmentProps) {
    this.validateAmount(props.amount);
    this.props = props;
  }

  public static create(props: Omit<InvestmentProps, 'id' | 'createdAt' | 'updatedAt'>): Investment {
    return new Investment({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  private validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error('El monto de inversión debe ser positivo');
    }
  }

  // Getters
  get id(): string { return this.props.id; }
  get investorId(): string { return this.props.investorId; }
  get propertyId(): string { return this.props.propertyId; }
  get amount(): number { return this.props.amount; }
  get status(): InvestmentStatus { return this.props.status; }
  get notes(): string | undefined { return this.props.notes; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  // Métodos de dominio
  public process(): void {
    if (this.props.status !== InvestmentStatus.INTERESTED) {
      throw new Error('Solo se pueden procesar inversiones en estado interesado');
    }
    this.props.status = InvestmentStatus.IN_PROCESS;
    this.props.updatedAt = new Date();
  }

  public complete(): void {
    if (this.props.status !== InvestmentStatus.IN_PROCESS) {
      throw new Error('Solo se pueden completar inversiones en proceso');
    }
    this.props.status = InvestmentStatus.COMPLETED;
    this.props.updatedAt = new Date();
  }

  public cancel(reason?: string): void {
    if (this.props.status === InvestmentStatus.COMPLETED) {
      throw new Error('No se pueden cancelar inversiones completadas');
    }
    this.props.status = InvestmentStatus.CANCELLED;
    if (reason) {
      this.props.notes = reason;
    }
    this.props.updatedAt = new Date();
  }

  public addNote(note: string): void {
    this.props.notes = this.props.notes 
      ? `${this.props.notes}\n${note}`
      : note;
    this.props.updatedAt = new Date();
  }
} 