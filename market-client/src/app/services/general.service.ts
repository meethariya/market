import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  serverPath:string = 'http://localhost:8081';

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    let token = this.getToken();
    return token != null;
  }

  async roleVerifier(role: string): Promise<boolean> {
    let token = this.getToken();

    if (token == null) return false;

    let user = await lastValueFrom(this.getUser().pipe(take(1)));

    if (user == null) return false;

    return user.role === role;
  }

  getUser(): Observable<any> {
    return this.http.get(this.serverPath+'/postLogin', {
      headers: this.headerGenerator(),
    });
  }

  headerGenerator(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Basic ' + this.getToken() });
  }
}
