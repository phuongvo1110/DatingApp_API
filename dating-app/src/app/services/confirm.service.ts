import { inject, Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  bsModelRef?: BsModalRef;
  private modalService = inject(BsModalService);
  confirm(
    title = 'Confirmation',
    message = 'Are you sure?',
    btnOkText = 'Ok',
    btnCancelText = 'Cancel'
  ) {
    this.bsModelRef = this.modalService.show(ConfirmDialogComponent, {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText,
      },
    });
    return this.bsModelRef.onHidden?.pipe(
      map(() => {
        if (this.bsModelRef?.content) {
          return this.bsModelRef.content.result;
        } else return false;
      })
    );
  }
}
