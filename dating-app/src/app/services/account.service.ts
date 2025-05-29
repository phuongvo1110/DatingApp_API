import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserRegister } from '../models/user-register';
import { LikesService } from './likes.service';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private presenceService = inject(PresenceService);
  constructor(private httpClient: HttpClient) {
    this.loadCurrentUser();
  }
  private likeService = inject(LikesService);
  currentUser = signal<User | null>(null);
  roles = computed(() => {
    const user = this.currentUser();
    if (user && user.token) {
      const roles = JSON.parse(atob(user.token.split(".")[1])).role;
      return Array.isArray(roles) ? roles : [roles];
    }
    return [null];
  })
  private loadCurrentUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUser.set(JSON.parse(userJson));
    }
  }
  login(userName: string, password: string) {
    return this.httpClient
      .post<User>(`${environment.baseUrl}/account/login`, {
        userName: userName,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user) {
            this.setCurrenUser(user);
          }
        })
      );
  }
  register(user: UserRegister) {
    return this.httpClient.post<User>(
      `${environment.baseUrl}/account/register`,
      user
    );
  }
  setCurrenUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.likeService.getLikeIds();
    this.presenceService.createHubConnection(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.presenceService.stopHubConnection();
  }
}
