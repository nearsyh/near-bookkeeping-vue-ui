export type Timestamp = number;

export class Money {
  cents: number;

  constructor(cents: number) {
    this.cents = cents;
  }

  public static fromStr(amount: string): Money {
    if (!amount.includes('.')) {
      return new Money(parseInt(amount) * 100);
    }
    const parts = amount.split('.');
    const firstPart = parseInt(parts[0]) * 100;
    let secondPart = parseInt(parts[1]);
    if (parts[1].length === 1) {
      secondPart *= 10;
    }
    return new Money(firstPart + secondPart);
  }

  public toStr(): string {
    const secondPart = this.cents % 100;
    const firstPart = (this.cents - secondPart) / 100;
    return `${firstPart}.${secondPart < 10 ? '0' : ''}${secondPart}`;
  }

  public abs(): Money {
    return new Money(Math.abs(this.cents));
  }

  negative(): Money {
    return new Money(-1 * this.cents);
  }
}
