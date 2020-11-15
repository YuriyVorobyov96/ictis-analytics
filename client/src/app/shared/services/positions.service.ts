import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Position, Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: HttpClient) {
  }

  list(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`${environment.apiUrl}/api/positions/${categoryId}`);
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>(`${environment.apiUrl}/api/positions/`, position);
  }

  update(position: Position): Observable<Position> {
    return this.http.put<Position>(`${environment.apiUrl}/api/positions/${position._id}`, position);
  }

  delete(position: Position): Observable<Message> {
    return this.http.delete<Message>(`${environment.apiUrl}/api/positions/${position._id}`);
  }

}