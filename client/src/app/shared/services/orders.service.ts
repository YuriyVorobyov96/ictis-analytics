import { Injectable } from '@angular/core';
import { Order } from '../interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }
  
  create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/api/orders`, order);
  }

  list(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/api/orders`, {
      params: new HttpParams({
        fromObject: params,
      }),
    }); 
  }

}