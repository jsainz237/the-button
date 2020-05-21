import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { Rank } from 'src/types/rank';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { setUser } from 'src/state/user/user.actions';

(window as any).global = window;

type APIResponse = {
  email: string;
  displayname: string;
  rank: Rank;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = "http://localhost:5000";
  
  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });

  // Store authentication data
  expiresAt: number;
  userProfile: any;
  accessToken: string;
  authenticated: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {
    this.getAccessToken();
  }

  checkNameAvailable(name: string) {
    return this.http.get<{ available: boolean }>(
      `${environment.api_url}/auth/check-displayname`,
      { 
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`),
        params: { displayname: name }
      }
    );
  }

  editDisplayname(name: string) {
    return this.http.post(
      `${environment.api_url}/auth/edit-displayname`,
      { displayname: name },
      { headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`) }
    );
  }

  APILogin() {
    if(this.userProfile) {
      this.http.post<APIResponse>(
        `${environment.api_url}/auth/login`,
        { email: this.userProfile.email, displayname: this.userProfile.nickname },
        { headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`) })
      .subscribe(({ email, displayname, rank }) => {
        this.store.dispatch(setUser({ email, displayname, rank }))
      })
    }
  }

  //------- AUTH0 FUNCTIONS ----------//

  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        this.APILogin();
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save authentication data and update login status subject
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;
  }

  logout() {
    // Log out of Auth0 session
    // Ensure that returnTo URL is specified in Auth0
    // Application settings for Allowed Logout URLs
    this.auth0.logout({
      returnTo: 'http://localhost:4200',
      clientID: environment.auth.clientID
    });
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this.expiresAt && this.authenticated;
  }
}
