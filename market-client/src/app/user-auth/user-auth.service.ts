import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private path:string = "http://localhost:8081"
  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  login(email:string, password:string) {
    // headers for the postLogin method
    let token:string = email+":"+password;
    const headers = new HttpHeaders({Authorization:"Basic " + window.btoa(token)});

    // form data for the login method
    let formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.httpClient.post(this.path+"/login",formData,{
      headers: headers
    });
  }

  register(formData: FormData){
    return this.httpClient.post(this.path+"/register",formData);
  }
}
