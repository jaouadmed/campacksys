import { Moment } from 'moment';
import { IPayment } from 'app/shared/model/payment.model';

export const enum BillState {
  AWAITING = 'AWAITING',
  UNPAID = 'UNPAID',
  PAID = 'PAID'
}

export interface IBill {
  id?: number;
  dueDate?: Moment;
  dueAmount?: number;
  state?: BillState;
  payment?: IPayment;
}

export class Bill implements IBill {
  constructor(
    public id?: number,
    public dueDate?: Moment,
    public dueAmount?: number,
    public state?: BillState,
    public payment?: IPayment
  ) {}
}
