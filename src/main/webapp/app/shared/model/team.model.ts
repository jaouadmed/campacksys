export interface ITeam {
  id?: number;
  name?: string;
  note?: string;
}

export class Team implements ITeam {
  constructor(public id?: number, public name?: string, public note?: string) {}
}
