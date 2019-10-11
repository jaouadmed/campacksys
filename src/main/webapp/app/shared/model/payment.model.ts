export const enum PaymentType {
  ONE_TIME = 'ONE_TIME',
  DIVIDED = 'DIVIDED'
}

export const enum PaymentState {
  CREATED = 'CREATED',
  ONGOING = 'ONGOING',
  SETTELED = 'SETTELED'
}

export interface IPayment {
  id?: number;
  type?: PaymentType;
  state?: PaymentState;
  total?: number;
  rest?: number;
}

export class Payment implements IPayment {
  constructor(public id?: number, public type?: PaymentType, public state?: PaymentState, public total?: number, public rest?: number) {}
}
