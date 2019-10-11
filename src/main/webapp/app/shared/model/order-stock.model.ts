import { Moment } from 'moment';
import { IAlert } from 'app/shared/model/alert.model';
import { ISupplier } from 'app/shared/model/supplier.model';
import { IEmployee } from 'app/shared/model/employee.model';

export const enum OrderStockState {
  CREATED = 'CREATED',
  AWAITING = 'AWAITING',
  RECEIVED = 'RECEIVED'
}

export interface IOrderStock {
  id?: number;
  date?: Moment;
  quantity?: number;
  state?: OrderStockState;
  alert?: IAlert;
  supplier?: ISupplier;
  employee?: IEmployee;
}

export class OrderStock implements IOrderStock {
  constructor(
    public id?: number,
    public date?: Moment,
    public quantity?: number,
    public state?: OrderStockState,
    public alert?: IAlert,
    public supplier?: ISupplier,
    public employee?: IEmployee
  ) {}
}
