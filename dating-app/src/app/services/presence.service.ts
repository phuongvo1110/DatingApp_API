import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubsUrl;
  onlineUsers = signal<string[]>([]);
  private hubConnection?: HubConnection;
  private toastr = inject(ToastrService);
  private router = inject(Router);
  constructor() {}
  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/presence`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start().catch((error) => console.log(error));
    this.hubConnection.on('UserIsOnline', userName => {
      this.onlineUsers.update((users) => [...users, userName]);
    });
    this.hubConnection.on('UserIsOffline', userName => {
      this.onlineUsers.update((users) => users.filter((user) => user !== userName));
    });
    this.hubConnection.on('GetOnlineUsers', usernames => {
      console.log(usernames);
      this.onlineUsers.set(usernames);
    });
    
    this.hubConnection.on("NewMessageReceived", ({username, knownAs}) => {
      this.toastr.info(knownAs + ' has sent you a new message!').onTap.pipe(take(1)).subscribe(() => {
        this.router.navigateByUrl(`/members/${username}?tab=Messages`);
      })
    });
  }
  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }
}
