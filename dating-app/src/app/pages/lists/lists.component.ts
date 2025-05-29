import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LikesService } from '../../services/likes.service';
import { Member } from '../../model/user';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class ListsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.likesService.paginatedResult.set(null);
  }
  likesService = inject(LikesService);
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  ngOnInit(): void {
    this.loadLikes();
  }
  loadLikes() {
    this.likesService.getLikes(this.predicate, this.pageNumber, this.pageSize);
  }
  getTitle() {
    switch (this.predicate) {
      case 'liked':
        return 'Members you like';
      case 'likedBy':
        return 'Members who like you';
      default:
        return 'Mutual';
    }
  }
  pageChanged(event: any) {
    if (this.pageNumber != event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}
