import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../product';
import { UserRegistration } from '../user-registration';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL = 'http://localhost:8087/api/v1/products';
  urlProductById: string = 'http://localhost:8087/api/v1/products/{id}';
  urlSearch: string = 'http://localhost:8087/api/auth/search/{query}';
  urlRegister: string = 'http://localhost:8087/api/auth/users';
  urlAllUsers: string = 'http://localhost:8087/api/auth/allusers';
  urlLogin: string = 'http://localhost:8087/api/auth/login';

  private msgSource = new Subject();
  current = this.msgSource.asObservable();

  constructor(private http: HttpClient) {}
  loginUserFromRemote(user: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.urlLogin}`, user);
  }
  registerUserFromRemote(user: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.urlRegister}`, user);
  }
  getAll(user: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.urlAllUsers}`, user);
  }
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}`);
  }
  getProductById(id: number) {
    return this.http.get<any>('http://localhost:8087/api/v1/products/'+id);
  }
  searchedProduct(query: any): Observable<any> {
    return this.http.get<any>('http://localhost:8087/api/v1/search/'+query);
  }
}
