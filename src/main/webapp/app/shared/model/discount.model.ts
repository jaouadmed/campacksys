export const enum DiscountNature {
  PERCENTAGE = 'PERCENTAGE',
  CASH = 'CASH',
  QUANTITY = 'QUANTITY'
}

export interface IDiscount {
  id?: number;
  nature?: DiscountNature;
  amount?: number;
}

export class Discount implements IDiscount {
  constructor(public id?: number, public nature?: DiscountNature, public amount?: number) {}
}
