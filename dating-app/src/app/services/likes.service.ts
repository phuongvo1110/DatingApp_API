import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../model/user';
import { PaginatedResult } from '../models/pagination';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  likeIds = signal<number[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
  constructor(private httpClient: HttpClient) {}
  toggleLike(targetId: number): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/Likes/${targetId}`, {});
  }
  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    console.log(params.toString());
    return this.httpClient
      .get<Member[]>(`${environment.baseUrl}/Likes`, {
        observe: 'response',
        params,
      })
      .subscribe({
        next: (response) => {
          setPaginatedResponse(response, this.paginatedResult);
        },
      });
  }
  getLikeIds() {
    return this.httpClient.get(`${environment.baseUrl}/Likes/list`).subscribe({
      next: (ids: any) => this.likeIds.set(ids),
    });
  }
}
