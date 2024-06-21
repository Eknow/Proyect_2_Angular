import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  creationDate?: Date;
  deleteDate?: Date;
  status?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/user/login`, credentials, {
      withCredentials: true,
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay un token en el almacenamiento local
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this.http
      .post(`${this.apiUrl}/api/user/logout`, {}, { withCredentials: true })
      .subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/user`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/user`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/api/user`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/user/${userId}`);
  }
}
