import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Member } from '../model/user';
import { environment } from '../../environments/environment';
import { Observable, of, tap } from 'rxjs';
import { AccountService } from './account.service';
import { Photo } from '../model/photo';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  // members = signal<Member[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
  memberCache = new Map();
  private accountService = inject(AccountService);
  user = this.accountService.currentUser();
  constructor(private httpClient: HttpClient) { }
  userParams = signal<UserParams>(new UserParams(this.user));
  resetUserParams() {
    this.userParams.set(new UserParams(this.user));
  }
  getMembers(){
    this.userParams().pageNumber = this.userParams().pageNumber || 1;
    const response = this.memberCache.get(Object.values(this.userParams()).join('-'));
    if (response) return setPaginatedResponse(response, this.paginatedResult);


    let params = setPaginationHeaders(this.userParams().pageNumber, this.userParams().pageSize);
    params = params.append('minAge', this.userParams().minAge);
    params = params.append('maxAge', this.userParams().maxAge);
    params = params.append('gender', this.userParams().gender);
    params = params.append('orderBy', this.userParams().orderBy);
    return this.httpClient.get<Member[]>(`${environment.baseUrl}/Users`, {observe: 'response', params}).subscribe({
      next: (response) => {
        setPaginatedResponse(response, this.paginatedResult);
        this.memberCache.set(Object.values(this.userParams()).join('-'), response);
      }
    });
  }
  getMember(userName: string): Observable<Member> {
    // const member = this.members().find(x => x.userName === userName);
    // if (member !== undefined) return of(member);
    const member = [...this.memberCache.values()].reduce((prev, curr) => prev.concat(curr.body), []).find((x: Member) => x.userName === userName);
    console.log(member);
    if (member) return of(member);
    return this.httpClient.get<Member>(`${environment.baseUrl}/Users/${userName}`);
  }
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.currentUser()?.token}`
      })
    }
  }
  updateMember(member: Member): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/Users`, member).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => m.userName === member.userName ? member : m));
      // })
    )
  }
  setMainPhoto(photo: Photo):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/Users/set-main-photo/${photo.id}`, {}).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if (m.photos.includes(photo)) {
      //       m.photoUrl = photo.url;
      //     }
      //     return m;
      //   }))
      // })
    );
  }
  deletePhoto(photo: Photo): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/Users/delete-photo/${photo.id}`, {}).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if (m.photos.includes(photo)) {
      //       m.photos = m.photos.filter(p => p.id !== photo.id);
      //     }
      //     return m;
      //   }))
      // })
    )
  }
}
