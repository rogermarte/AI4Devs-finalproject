interface FinancialMetricsProps {
  irr: number;
  paybackPeriod: number;
  occupancyRate: number;
}

export class FinancialMetrics {
  private constructor(
    private readonly _irr: number,
    private readonly _roi: number,
    private readonly _paybackPeriod: number,
    private readonly _occupancyRate: number
  ) {
    this.validate();
  }

  static create(props: {
    irr: number;
    roi: number;
    paybackPeriod: number;
    occupancyRate: number;
  }): FinancialMetrics {
    return new FinancialMetrics(
      props.irr,
      props.roi,
      props.paybackPeriod,
      props.occupancyRate
    );
  }

  get irr(): number {
    return this._irr;
  }

  get roi(): number {
    return this._roi;
  }

  get paybackPeriod(): number {
    return this._paybackPeriod;
  }

  get occupancyRate(): number {
    return this._occupancyRate;
  }

  private validate(): void {
    if (this._irr < -100) {
      throw new Error('IRR no puede ser menor que -100%');
    }

    if (this._paybackPeriod <= 0) {
      throw new Error('El período de recuperación debe ser positivo');
    }

    if (this._occupancyRate < 0 || this._occupancyRate > 100) {
      throw new Error('La tasa de ocupación debe estar entre 0 y 100');
    }
  }

  public toValue(): Record<string, number> {
    return {
      irr: this.irr,
      paybackPeriod: this.paybackPeriod,
      occupancyRate: this.occupancyRate
    };
  }
} 