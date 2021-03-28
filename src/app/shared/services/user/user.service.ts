import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/users';
  }

  getJSONUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url);
  }

  getJSONUser(id: number | string): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`);
  }

  postJSONUser(newUser: IUser): Observable<void> {
    return this.http.post<void>(this.url, newUser);
  }

  deleteJSONUser(id: number | string): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/${id}`);
  }
}
