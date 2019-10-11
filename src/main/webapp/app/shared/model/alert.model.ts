import { Moment } from 'moment';
import { IStock } from 'app/shared/model/stock.model';

export const enum AlertState {
  CREATED = 'CREATED',
  VIEWED = 'VIEWED',
  HANDLED = 'HANDLED'
}

export interface IAlert {
  id?: number;
  date?: Moment;
  state?: AlertState;
  stock?: IStock;
}

export class Alert implements IAlert {
  constructor(public id?: number, public date?: Moment, public state?: AlertState, public stock?: IStock) {}
}
