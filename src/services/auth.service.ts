import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators } from '@angular/forms';

interface APIResponse {
  success?: boolean;
  errors?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = "http://localhost:5000";

  constructor( private http: HttpClient ) { }

  /** check username availability from server */
  checkUsernameAvailability(username: string) {
    return this.http.post(`${this.API_URL}/auth/check-username`, { username })
  }

  register(username: string, password: string) {
    return this.http.post<APIResponse & { id: string }>(`${this.API_URL}/auth/register`, { username, password }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /** send login POST request to server with credentials */
  login(username: string, password: string) {
    return this.http.post<APIResponse>(`${this.API_URL}/auth/login`, { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
