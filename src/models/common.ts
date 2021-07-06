export type Timestamp = number;

export class Money {
  cents: number;

  constructor(cents: number) {
    this.cents = cents;
  }

  public static fromStr(amount: string): Money | undefined {
    if (amount.startsWith('-')) {
      return Money.fromStr(amount.substr(1))?.negative();
    }

    if (!amount.includes('.')) {
      if (isNaN(parseInt(amount))) {
        return undefined;
      }
      return new Money(parseInt(amount) * 100);
    }
    const parts = amount.split('.');
    if (parts.length > 2) {
      return undefined;
    }
    const firstPart = parseInt(parts[0]);
    let secondPart = parseInt(parts[1]);
    if (isNaN(firstPart) || isNaN(secondPart)) {
      return undefined;
    }
    if (parts[1].length === 1) {
      secondPart *= 10;
    }
    return new Money(firstPart * 100 + secondPart);
  }

  public toStr(): string {
    if (this.cents < 0) {
      return `-${this.negative().toStr()}`;
    }
    const secondPart = this.cents % 100;
    const firstPart = (this.cents - secondPart) / 100;
    return `${firstPart}.${secondPart < 10 ? '0' : ''}${secondPart}`;
  }

  public abs(): Money {
    return new Money(Math.abs(this.cents));
  }

  public get isNegative(): boolean {
    return this.cents < 0;
  }

  negative(): Money {
    return new Money(-1 * this.cents);
  }

  public add(other: Money): Money {
    return new Money(this.cents + other.cents);
  }

  public clone(): any {
    return new Money(this.cents);
  }
}
