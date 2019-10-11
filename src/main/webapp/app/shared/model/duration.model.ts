import { Moment } from 'moment';
import { IMission } from 'app/shared/model/mission.model';

export interface IDuration {
  id?: number;
  dateFrom?: Moment;
  dateTo?: Moment;
  mission?: IMission;
}

export class Duration implements IDuration {
  constructor(public id?: number, public dateFrom?: Moment, public dateTo?: Moment, public mission?: IMission) {}
}
