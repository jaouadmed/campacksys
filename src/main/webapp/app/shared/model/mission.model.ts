import { Moment } from 'moment';
import { ITeam } from 'app/shared/model/team.model';
import { IClient } from 'app/shared/model/client.model';

export const enum MissionState {
  CREATED = 'CREATED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED'
}

export interface IMission {
  id?: number;
  creationDate?: Moment;
  nbrDays?: number;
  startDate?: Moment;
  state?: MissionState;
  team?: ITeam;
  client?: IClient;
}

export class Mission implements IMission {
  constructor(
    public id?: number,
    public creationDate?: Moment,
    public nbrDays?: number,
    public startDate?: Moment,
    public state?: MissionState,
    public team?: ITeam,
    public client?: IClient
  ) {}
}
