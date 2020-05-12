import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

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

  /** send login POST request to server with credentials */
  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/auth/login`, { username, password });
  }
}
