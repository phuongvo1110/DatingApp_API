import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../../model/user';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member?: Member;
  constructor(private accountService: AccountService, private memberService: MemberService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.loadMember()
  }
  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) {
      return;
    }
    this.memberService.getMember(user.userName as string).subscribe({
      next: (member) => this.member = member
    })
  }
  updateUser() {
    console.log(this.member);
    this.memberService.updateMember({...this.editForm?.value}).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      },
      error: (error) => {
        this.toastr.error(error);
      }
    })
  }
  onMemberChange(event: Member) {
    this.member = event;
  }
}
