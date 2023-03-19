import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, take } from 'rxjs';
import { Category } from '../models/category';
import { Inventory } from '../models/inventory';
import { Product } from '../models/product';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  // Backend Server Path
  serverPath: string = 'http://localhost:8081';

  /**
   * @returns token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * @returns role from localStorage
   */
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  /**
   * @returns profilePic of logged in user or null if not logged in
   */
  getProfilePic(): string | null {
    return localStorage.getItem('profilePic');
  }

  /**
   * @returns name of logged in user or null if not logged in
   */
  getName(): string | null{
    return localStorage.getItem('name');
  }

  /**
   * Check is user is authenticated or not.
   * @returns boolean
   */
  isAuthenticated(): boolean {
    let token = this.getToken();
    return token != null;
  }

  /**
   * Fetches token using {@link getToken()}.  
   * Gets user using {@link getUser()}. 
   * returns role of the user.  
   * **This is an asynchronous funtion**
   * @param role
   * @returns whether the authenticated is of the same role as passed.
   */
  async roleVerifier(role: string): Promise<boolean> {
    let token = this.getToken();

    if (token == null) return false;

    let user = await lastValueFrom(this.getUser().pipe(take(1)));

    if (user == null) return false;

    return user.role === role;
  }

  /**
   * Get user information.
   * Backend Request: **GET** `/postLogin`
   * @see {@link headerGenerator()}
   * @returns authenticated user
   */
  getUser(): Observable<User> {
    return this.http.get<User>(this.serverPath + '/postLogin', {
      headers: this.headerGenerator(),
    });
  }

  /**
   * Generates Basic Authentication using token from localStorage.  
   * Uses {@link getToken()}.
   * @returns HTTPHeaders
   */
  headerGenerator(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Basic ' + this.getToken() });
  }

  /**
   * Get all Products.  
   * Backend Request: **GET** `/product`
   * @see {@link headerGenerator()}
   * @returns `Observable<Product[]>`
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.serverPath + '/product', {
      headers: this.headerGenerator(),
    });
  }

  /**
   * Get all Inventory.  
   * Backend Request: **GET** `/inventory`
   * @see {@link headerGenerator()}
   * @returns `Observable<Inventory[]>`
   */
  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.serverPath + '/inventory', {
      headers: this.headerGenerator(),
    });
  }

  /**
   * Get all Category.  
   * Backend Request: **GET** `/category`
   * @see {@link headerGenerator()}
   * @returns `Observable<Category[]>`
   */
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.serverPath + '/category', {
      headers: this.headerGenerator(),
    });
  }
}
