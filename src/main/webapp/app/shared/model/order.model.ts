import { Moment } from 'moment';
import { IDiscount } from 'app/shared/model/discount.model';
import { IPayment } from 'app/shared/model/payment.model';
import { IClient } from 'app/shared/model/client.model';
import { IEmployee } from 'app/shared/model/employee.model';

export const enum OrderState {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  CONFIRMED = 'CONFIRMED'
}

export interface IOrder {
  id?: number;
  date?: Moment;
  total?: number;
  state?: OrderState;
  discount?: IDiscount;
  payment?: IPayment;
  client?: IClient;
  employee?: IEmployee;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public date?: Moment,
    public total?: number,
    public state?: OrderState,
    public discount?: IDiscount,
    public payment?: IPayment,
    public client?: IClient,
    public employee?: IEmployee
  ) {}
}
