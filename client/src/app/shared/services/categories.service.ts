import { Injectable } from '@angular/core';
import { Category, Message } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }
  
  list(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/categories/`);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/api/categories/${id}`);
  }

  create(name: string, image?: File): Observable<Category> {
    const fd= new FormData();

    if (image) {
      fd.append('file', image, image.name);
    }

    fd.append('name', name);

    return this.http.post<Category>(`${environment.apiUrl}/api/categories/`, fd);
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const fd= new FormData();

    if (image) {
      fd.append('file', image, image.name);
    }

    fd.append('name', name);

    return this.http.put<Category>(`${environment.apiUrl}/api/categories/${id}`, fd);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`${environment.apiUrl}/api/categories/${id}`);
  }

}