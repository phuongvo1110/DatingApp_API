import { AfterViewChecked, Component, EventEmitter, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss'
})
export class MemberMessagesComponent implements OnInit, AfterViewChecked {
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  private scrollToBottom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scrollMe') scrollContainer?: any;
  ngOnInit(): void {
  }
  @Input({required: true}) userName!: string;
  messageService = inject(MessageService);
  messageContent = '';
  sendMessage() {
    this.messageService.sendMessage(this.userName, this.messageContent).then(() => {
      this.messageForm?.reset();
    });
  }
}
