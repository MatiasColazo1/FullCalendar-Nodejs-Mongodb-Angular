import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  
  getEvents(start: string, end: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/calendario/?start=${start}&end=${end}`);
  }

  addEvent(eventData: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}`, eventData);
  }
}


export interface Evento {
  _id?: string;
  title: string;
  start: Date;
  end?: Date;
}