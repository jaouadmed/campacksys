import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderStock } from 'app/shared/model/order-stock.model';

type EntityResponseType = HttpResponse<IOrderStock>;
type EntityArrayResponseType = HttpResponse<IOrderStock[]>;

@Injectable({ providedIn: 'root' })
export class OrderStockService {
  public resourceUrl = SERVER_API_URL + 'api/order-stocks';

  constructor(protected http: HttpClient) {}

  create(orderStock: IOrderStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orderStock);
    return this.http
      .post<IOrderStock>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(orderStock: IOrderStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orderStock);
    return this.http
      .put<IOrderStock>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrderStock>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrderStock[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(orderStock: IOrderStock): IOrderStock {
    const copy: IOrderStock = Object.assign({}, orderStock, {
      date: orderStock.date != null && orderStock.date.isValid() ? orderStock.date.format(DATE_FORMAT) : null
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
      res.body.forEach((orderStock: IOrderStock) => {
        orderStock.date = orderStock.date != null ? moment(orderStock.date) : null;
      });
    }
    return res;
  }
}
