import { Component, inject, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../../model/user';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { PresenceService } from '../../../services/presence.service';
import { AccountService } from '../../../services/account.service';
import { HubConnectionState } from '@microsoft/signalr';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss',
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  activeTab?: TabDirective;
  images: GalleryItem[] = [];
  messageService = inject(MessageService);
  presenceService = inject(PresenceService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.member = data['member'];
        this.member &&
          this.member.photos.map((member) =>
            this.images.push(
              new ImageItem({ src: member.url, thumb: member.url })
            )
          );
      },
    });
    this.route.paramMap.subscribe({
      next: () => {
        this.onRouteParamsChange();
      }
    })
    this.route.queryParams.subscribe({
      next: (params) => {
        params['tab'] && this.selectTab(params['tab']);
      },
    });
  }
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        tab: this.activeTab.heading
      },
      queryParamsHandling: 'merge'
    })
    if (
      this.activeTab.heading === 'Messages' &&
      this.member
    ) {
      const user = this.accountService.currentUser();
      if (user == null) return;
      this.messageService.createHubConnection(user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }
  onRouteParamsChange() {
    const user = this.accountService.currentUser();
    if (!user) return;
    if (this.messageService.hubConnection.state === HubConnectionState.Connected && this.activeTab?.heading === 'Messages') {
      this.messageService.hubConnection.stop().then(() => {
        this.messageService.createHubConnection(user, this.member.userName);
      })
    }
  }
  selectTab(heading: string) {
    if (this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(
        (x) => x.heading === heading
      );
      if (messageTab) messageTab.active = true;
    }
  }
  member: Member = {} as Member;
  // loadMember() {
  //   const userName = this.route.snapshot.paramMap.get('userName');
  //   if (!userName) return;
  //   this.memberService.getMember(userName).subscribe({
  //     next: (member) => {
  //       this.member = member;
  //       member.photos.map((member) =>
  //         this.images.push(
  //           new ImageItem({ src: member.url, thumb: member.url })
  //         )
  //       );
  //     },
  //   });
  // }
}
