export interface IUnit {
  id?: number;
  unit?: string;
  description?: string;
}

export class Unit implements IUnit {
  constructor(public id?: number, public unit?: string, public description?: string) {}
}
