import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Photo } from '../../../model/photo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrl: './photo-management.component.scss'
})
export class PhotoManagementComponent implements OnInit {
  ngOnInit(): void {
    this.adminService.getPhotoForApproval().subscribe({
      next: (photos) => {
        this.photos = photos;
      }
    })
  }
  private adminService = inject(AdminService);
  private toast = inject (ToastrService);
  photos: Photo[] = [];
  approvePhoto(photoId: number) {
    this.adminService.approvePhoto(photoId).subscribe({
      next: () => {
        this.photos = this.photos.filter(p => p.id !== photoId);
        this.toast.success("Photo approved successfully", "Success");
      },
      error: (error) => {
        console.error('Error approving photo:', error);
      }
    });
  }
  rejectPhoto(photoId: number) {
    this.adminService.rejectPhoto(photoId).subscribe({
      next: () => {
        this.photos = this.photos.filter(p => p.id !== photoId);
        this.toast.error("Photo rejected successfully", "Success");
      }
    })
  }
}
