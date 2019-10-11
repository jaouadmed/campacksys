import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IItemLine } from 'app/shared/model/item-line.model';

type EntityResponseType = HttpResponse<IItemLine>;
type EntityArrayResponseType = HttpResponse<IItemLine[]>;

@Injectable({ providedIn: 'root' })
export class ItemLineService {
  public resourceUrl = SERVER_API_URL + 'api/item-lines';

  constructor(protected http: HttpClient) {}

  create(itemLine: IItemLine): Observable<EntityResponseType> {
    return this.http.post<IItemLine>(this.resourceUrl, itemLine, { observe: 'response' });
  }

  update(itemLine: IItemLine): Observable<EntityResponseType> {
    return this.http.put<IItemLine>(this.resourceUrl, itemLine, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemLine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
