import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../core/models/user.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private http = inject(HttpClient);
  private API = 'http://localhost:3000/users';

  users = signal<User[]>([]);
  loading = signal(false);

  load() {
    this.loading.set(true);
    this.http.get<User[]>(this.API).subscribe(res => {
      this.users.set(res);
      this.loading.set(false);
    });
  }

  add(user: User) {
    return this.http.post<User>(this.API, user)
      .pipe(tap(() => this.load()));
  }

  update(user: User) {
    return this.http.put(`${this.API}/${user.id}`, user)
      .pipe(tap(() => this.load()));
  }

  delete(id: number) {
    return this.http.delete(`${this.API}/${id}`)
      .pipe(tap(() => this.load()));
  }
}
