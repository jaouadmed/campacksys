import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMission } from 'app/shared/model/mission.model';

type EntityResponseType = HttpResponse<IMission>;
type EntityArrayResponseType = HttpResponse<IMission[]>;

@Injectable({ providedIn: 'root' })
export class MissionService {
  public resourceUrl = SERVER_API_URL + 'api/missions';

  constructor(protected http: HttpClient) {}

  create(mission: IMission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mission);
    return this.http
      .post<IMission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(mission: IMission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mission);
    return this.http
      .put<IMission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMission>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMission[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(mission: IMission): IMission {
    const copy: IMission = Object.assign({}, mission, {
      creationDate: mission.creationDate != null && mission.creationDate.isValid() ? mission.creationDate.format(DATE_FORMAT) : null,
      startDate: mission.startDate != null && mission.startDate.isValid() ? mission.startDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((mission: IMission) => {
        mission.creationDate = mission.creationDate != null ? moment(mission.creationDate) : null;
        mission.startDate = mission.startDate != null ? moment(mission.startDate) : null;
      });
    }
    return res;
  }
}
