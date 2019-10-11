import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAlert } from 'app/shared/model/alert.model';

type EntityResponseType = HttpResponse<IAlert>;
type EntityArrayResponseType = HttpResponse<IAlert[]>;

@Injectable({ providedIn: 'root' })
export class AlertService {
  public resourceUrl = SERVER_API_URL + 'api/alerts';

  constructor(protected http: HttpClient) {}

  create(alert: IAlert): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alert);
    return this.http
      .post<IAlert>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(alert: IAlert): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alert);
    return this.http
      .put<IAlert>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAlert>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAlert[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(alert: IAlert): IAlert {
    const copy: IAlert = Object.assign({}, alert, {
      date: alert.date != null && alert.date.isValid() ? alert.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((alert: IAlert) => {
        alert.date = alert.date != null ? moment(alert.date) : null;
      });
    }
    return res;
  }
}
