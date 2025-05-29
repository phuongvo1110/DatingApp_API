import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.scss'
})
export class RolesModalComponent {
  bsModalRef = inject(BsModalRef);
  title = '';
  availableRoles: string[] = [];
  selectedRoles: string[] = [];
  userName = '';
  rolesUpdated: boolean = false;
  updateChecked(checkedValue: string) {
    if (this.selectedRoles.includes(checkedValue)) {
      this.selectedRoles = this.selectedRoles.filter((x) => x !== checkedValue);
    } else {
      this.selectedRoles.push(checkedValue);
    }
  }
  onSelectRoles() {
    this.rolesUpdated = true;
    this.bsModalRef.hide();
  }
}
