import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PaginatedResult } from '../models/pagination';
import { Message } from '../models/message';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  hubUrl = environment.hubsUrl;
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);
  messageThread = signal<Message[]>([]);
  hubConnection!: HubConnection;
  constructor(private httpClient: HttpClient) {}
  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/message?user=${otherUsername}`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start().catch((error) => console.log(error));
    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      this.messageThread.set(messages);
      console.log(messages);
    }); 
    this.hubConnection.on("NewMessage", (message) => {
      this.messageThread.update((messages) => [...messages,message]);
    });
    this.hubConnection.on("UpdatedGroup", (group) => {
      if (group.connections.some((x: any) => x.username === otherUsername)) {
        this.messageThread.update((messages) => {
          messages.forEach(message => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now());
            }
          })
          return messages;
        })
      }
    })
  }
  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch((error) => console.log(error));
    }
  }
  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = setPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return this.httpClient
      .get<Message[]>(`${environment.baseUrl}/Messages`, {
        observe: 'response',
        params,
      })
      .subscribe({
        next: (response) => {
          setPaginatedResponse(response, this.paginatedResult);
        },
      });
  }
  getMessageThread(userName: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(
      `${environment.baseUrl}/messages/thread/${userName}`
    );
  }
  async sendMessage(userName: string, content: string) {
    return this.hubConnection.invoke("SendMessage", {
      recipientUsername: userName,
      content: content
    });
  }
  deleteMesage(messageId: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/messages/${messageId}`
    );
  }
}
