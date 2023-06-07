import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

/**
 * UserAuth Service. All Authentication requests are made from this service.  
 */
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private path: string;

  constructor(private httpClient: HttpClient, private router: Router, private generalService: GeneralService) {
    this.path = generalService.serverPath;
  }

  /**
   * registers a customer.
   * Backend Request: **POST** `/register`
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
   * sets name to local storage
   * @param name 
   */
  setName(name: string): void {
    localStorage.setItem('name', name);
  }

  /**
   * sets profile pic url to local storage
   * @param profilePic 
  */
 setProfilePic(profilePic: string): void {
   localStorage.setItem('profilePic', profilePic);
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
   * removes the token and redirects to home page.  
   * Backend Request: **GET** `/logout`
   */
  logout(): void {
    this.httpClient.get(this.path+"/logout", {responseType:"text"}).subscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('profilePic');
    this.router.navigate(['/']);
  }

  /** Validates the email id and password from backend
   * Backend Request: **POST** `/login`
   * @param formData
   * @param token
   * @returns boolean
   */
  login(formData: FormData, token : string): Observable<any> {
    // headers for the postLogin method
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + token,
    });

    return this.httpClient.post(this.path + '/login', formData, { headers: headers });
  }

  /**
   * Sends user name and email for OTP request. Sends user OTP email and returns OTP
   * @param formData 
   * @returns OTP
   */
  requestOtp(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(this.path + '/sendOtp', formData);
  }
}
