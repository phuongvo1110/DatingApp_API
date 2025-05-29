import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Photo } from '../model/photo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}
  getUserWithRoles(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${environment.baseUrl}/admin/users-with-roles`
    );
  }
  updateUserRoles(userName: string, roles: string[]) {
    return this.httpClient.post<string[]>(
      `${environment.baseUrl}/admin/edit-roles/${userName}?roles=${roles}`,
      {}
    );
  }
  getPhotoForApproval(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(`${environment.baseUrl}/admin/photos-for-approval`);
  }
  approvePhoto(photoId: number): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.baseUrl}/admin/approve-photo/${photoId}`,
      {}
    );
  }
  rejectPhoto(photoId: number): Observable<Photo> {
    return this.httpClient.post<any>(
      `${environment.baseUrl}/admin/reject-photo/${photoId}`,
      {}
    );
  }
}
