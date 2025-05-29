import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../model/user';
import { AccountService } from '../../../services/account.service';
import { UserParams } from '../../../models/userParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  memberService = inject(MemberService);
  genderList = [{value: 'male', display: 'Males'}, {value:'female', display: 'Females'}];
  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) {
      this.loadMembers();
    }
  }
  loadMembers() {
    this.memberService.getMembers();
  }
  resetFilters() {
    this.memberService.resetUserParams();
    this.loadMembers();
  }
  pageChanged(event: any) {
    if (this.memberService.userParams().pageNumber !== event.page) {
      this.memberService.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
