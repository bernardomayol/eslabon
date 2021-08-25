import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserCreate } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<IUser[]>(this.baseUrl + 'users');
  }

  getUser(userId: string) {
    return this.http.get<IUser>(this.baseUrl + 'users/' + userId);
  }

  deleteUser(userId: string) {
    return this.http.delete(this.baseUrl + 'users/' + userId);
  }

  updateUser(userId: string, user: IUserCreate) {
    return this.http.put(this.baseUrl + 'users/' + userId, user);
  }

  createUser(user: IUserCreate) {
    return this.http.post(this.baseUrl + 'users', user);
  }
}
