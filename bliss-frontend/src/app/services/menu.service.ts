import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
 // Points to Spring Boot port 8080
//private apiUrl = 'https://bliss-backend-app.onrender.com';
//private apiUrl = `${environment.apiUrl}`;
private apiUrl = `${environment.apiUrl}/api/menu`;
  constructor(private http: HttpClient) { }

  getItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }
  createItem(formData: FormData): Observable<MenuItem> {
  return this.http.post<MenuItem>(this.apiUrl, formData);
}

updateItem(id: number, formData: FormData): Observable<MenuItem> {
  return this.http.put<MenuItem>(`${this.apiUrl}/${id}`, formData);
}

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}