export interface ISupplier {
  id?: number;
  name?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
}

export class Supplier implements ISupplier {
  constructor(public id?: number, public name?: string, public address?: string, public email?: string, public phoneNumber?: string) {}
}
