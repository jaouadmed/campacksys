import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDuration } from 'app/shared/model/duration.model';

type EntityResponseType = HttpResponse<IDuration>;
type EntityArrayResponseType = HttpResponse<IDuration[]>;

@Injectable({ providedIn: 'root' })
export class DurationService {
  public resourceUrl = SERVER_API_URL + 'api/durations';

  constructor(protected http: HttpClient) {}

  create(duration: IDuration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duration);
    return this.http
      .post<IDuration>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(duration: IDuration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duration);
    return this.http
      .put<IDuration>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDuration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDuration[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(duration: IDuration): IDuration {
    const copy: IDuration = Object.assign({}, duration, {
      dateFrom: duration.dateFrom != null && duration.dateFrom.isValid() ? duration.dateFrom.format(DATE_FORMAT) : null,
      dateTo: duration.dateTo != null && duration.dateTo.isValid() ? duration.dateTo.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateFrom = res.body.dateFrom != null ? moment(res.body.dateFrom) : null;
      res.body.dateTo = res.body.dateTo != null ? moment(res.body.dateTo) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((duration: IDuration) => {
        duration.dateFrom = duration.dateFrom != null ? moment(duration.dateFrom) : null;
        duration.dateTo = duration.dateTo != null ? moment(duration.dateTo) : null;
      });
    }
    return res;
  }
}
