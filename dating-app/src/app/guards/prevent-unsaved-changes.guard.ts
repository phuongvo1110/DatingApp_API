import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../pages/members/member-edit/member-edit.component';
import { inject } from '@angular/core';
import { ConfirmService } from '../services/confirm.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  const confirmService = inject(ConfirmService);
  if (component.editForm?.dirty) {
    return confirmService.confirm() ?? false;
  }
  return true;
};
