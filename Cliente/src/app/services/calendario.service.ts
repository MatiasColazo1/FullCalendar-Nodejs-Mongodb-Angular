import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  createEventCalendar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/calendario`, data);
  }

  getAllEventsCalendar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/calendario`);
  }

  updateEventCalendar(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/calendario`, data);
  }

  deleteEventCalendar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/calendario/${id}`);
  }
}


