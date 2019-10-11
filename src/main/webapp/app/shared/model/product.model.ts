import { ICategory } from 'app/shared/model/category.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  barCode?: number;
  buyingPrice?: number;
  sellingPrice?: number;
  category?: ICategory;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public barCode?: number,
    public buyingPrice?: number,
    public sellingPrice?: number,
    public category?: ICategory
  ) {}
}
