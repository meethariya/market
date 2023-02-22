import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean{
    let token = localStorage.getItem('token');
    return token != null;
  }

  async roleVerifier(role:string): Promise<boolean> {
    let token = localStorage.getItem('token');

    if (token == null) return false;

    let user = await lastValueFrom(this.getUser(token).pipe(take(1)));

    if (user == null) return false;

    return user.role === role;
  }

  getUser(token: string): Observable<any> {
    let headers = new HttpHeaders({ Authorization: 'Basic ' + token });
    return this.http.get('http://localhost:8081/postLogin', {
      headers: headers,
    });
  }
}
