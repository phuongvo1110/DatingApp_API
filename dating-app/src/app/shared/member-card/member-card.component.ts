import { Component, computed, inject, Input } from '@angular/core';
import { Member } from '../../model/user';
import { LikesService } from '../../services/likes.service';
import { PresenceService } from '../../services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent {
  private likesService = inject(LikesService);
  private presenceService = inject(PresenceService);
  @Input({ required: true }) member!: Member;
  hasLiked = computed(() =>
    this.likesService.likeIds().includes(this.member.id)
  );
  isOnline = computed(() => 
    this.presenceService.onlineUsers().includes(this.member.userName)
  );
  toggleLike() {
    this.likesService.toggleLike(this.member.id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likesService.likeIds.update((ids) =>
            ids.filter((x) => x !== this.member.id)
          );
        } else {
          this.likesService.likeIds.update(ids => [...ids, this.member.id])
        }
      },
    });
  }
}
