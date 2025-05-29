import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '../../../model/user';
import { FileUploader } from 'ng2-file-upload';
import { AccountService } from '../../../services/account.service';
import { environment } from '../../../../environments/environment';
import { MemberService } from '../../../services/member.service';
import { ToastrService } from 'ngx-toastr';
import { Photo } from '../../../model/photo';
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss',
})
export class PhotoEditorComponent implements OnInit {
  uploader!: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  response!: string;
  @Output() memberChange = new EventEmitter<Member>();
  @Input({ required: true }) member!: Member;
  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initializeUploader();
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: environment.baseUrl + '/Users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      const user = this.accountService.currentUser();
      if (user && photo.isMain) {
        user.photoUrl = photo.url;
        this.accountService.setCurrenUser(user);
      }
      const updatedMember = { ...this.member };
      if (updatedMember.photos.length === 0 && photo.isMain) updatedMember.photoUrl = photo.url;
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
    };
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo).subscribe({
      next: () => {
        const user = this.accountService.currentUser();
        if (user) {
          user.photoUrl = photo.url;
          this.accountService.setCurrenUser(user);
        }
        const updatedMember = { ...this.member };
        updatedMember.photoUrl = photo.url;
        updatedMember.photos.forEach((p) => {
          if (p.isMain) p.isMain = false;
          if (p.id === photo.id) p.isMain = true;
        });
        this.memberChange.emit(updatedMember);
        this.toastr.success('Photo updated successfully');
      },
      error: (error) => {
        this.toastr.error(error);
      },
    });
  }
  deletePhoto(photo: Photo) {
    this.memberService.deletePhoto(photo).subscribe({
      next: () => {
        const updatedMember = { ...this.member };
        updatedMember.photos = updatedMember.photos.filter(
          (p) => p.id !== photo.id
        );
        this.memberChange.emit(updatedMember);
        this.toastr.success('Photo deleted successfully');
      },
    });
  }
}
