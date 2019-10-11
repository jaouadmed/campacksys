import { IProduct } from 'app/shared/model/product.model';
import { IUnit } from 'app/shared/model/unit.model';

export interface IStock {
  id?: number;
  quantity?: number;
  alertLimit?: number;
  product?: IProduct;
  unit?: IUnit;
}

export class Stock implements IStock {
  constructor(public id?: number, public quantity?: number, public alertLimit?: number, public product?: IProduct, public unit?: IUnit) {}
}
