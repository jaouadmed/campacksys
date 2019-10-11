export const enum ClientType {
  COMPANY = 'COMPANY',
  INDIVIDUAL = 'INDIVIDUAL'
}

export interface IClient {
  id?: number;
  name?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  clientType?: ClientType;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public email?: string,
    public phoneNumber?: string,
    public clientType?: ClientType
  ) {}
}
