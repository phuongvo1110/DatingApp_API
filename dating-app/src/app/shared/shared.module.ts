import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from './member-card/member-card.component';
import { RouterLink } from '@angular/router';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './forms/date-picker/date-picker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [MemberCardComponent, TextInputComponent, DatePickerComponent, RolesModalComponent, ConfirmDialogComponent],
  exports: [MemberCardComponent, TextInputComponent, DatePickerComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ]
})
export class SharedModule { }
