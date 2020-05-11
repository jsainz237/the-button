import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = "http://localhost:5000";

  constructor( private http: HttpClient ) { }

  validateUsername(username: string): void {
  }

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { username, password });
  }
}
