import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private path: string = 'http://localhost:8081';

  constructor(private httpClient: HttpClient, private router: Router) {}

  /**
   * registers a customer
   * @param formData
   * @returns id of the new customer or throws exception
   */
  register(formData: FormData) {
    return this.httpClient.post(this.path + '/register', formData);
  }

  /**
   * sets token to local storage
   * @param token
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * sets role to local storage
   * @param role
   */
  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  /**
   * fetchs token from local storage
   * @returns token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * validates logged in user
   * @returns boolean
   */
  isLoggedIn(): boolean {
    if (this.getToken() !== null)
      return true;
    return false;
  }

  /**
   * removes the token and redirects to home page
   */
  logout(): void {
    this.httpClient.get(this.path+"/logout", {responseType:"text"}).subscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  /** Validates the email id and password from backend
   *
   * @param email
   * @param password
   * @returns boolean
   */
  login(formData: FormData, token : string): Observable<any> {
    // headers for the postLogin method
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + token,
    });

    return this.httpClient.post(this.path + '/login', formData, { headers: headers });
  }
}
