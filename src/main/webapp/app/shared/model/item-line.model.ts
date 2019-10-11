import { IOrder } from 'app/shared/model/order.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IItemLine {
  id?: number;
  quantity?: number;
  total?: number;
  order?: IOrder;
  product?: IProduct;
}

export class ItemLine implements IItemLine {
  constructor(public id?: number, public quantity?: number, public total?: number, public order?: IOrder, public product?: IProduct) {}
}
