import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  ngOnInit(): void {
    this.loadMessages();
  }
  messageService = inject(MessageService);
  container = 'Outbox';
  pageNumber = 1;
  pageSize = 5;
  isOutbox = this.container === 'Outbox';
  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container);
  }
  pageChanged(event: any) {
    if (this.pageNumber != event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  } 
  getRoute(message: Message) {
    if (this.container === 'Outbox') return `/members/${message.recipientUsername}`;
    else return `/members/${message.senderUsername}`;
  }
  deleteMessage(id: number) {
    this.messageService.deleteMesage(id).subscribe({
      next: () => {
        this.messageService.paginatedResult.update(prev => {
          if (prev && prev.items) {
            prev.items.splice(prev.items.findIndex(x => x.id === id), 1);
            return prev;
          }
          return prev;
        })
      }
    });
  }
}
