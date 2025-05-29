import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AccountModule } from '../account/account.module';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ListsComponent } from './lists/lists.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { SharedModule } from '../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryModule } from 'ng-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component'
import { FormsModule } from '@angular/forms';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons'
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from './messages/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { DirectivesModule } from '../directives/directives.module';
import { MessageService } from '../services/message.service';

@NgModule({
  declarations: [HomeComponent, MemberDetailComponent, MemberListComponent, MessagesComponent, ListsComponent, NotFoundComponent, ServerErrorComponent, MemberEditComponent, PhotoEditorComponent, MemberMessagesComponent, AdminPanelComponent, UserManagementComponent, PhotoManagementComponent],
  imports: [
    FormsModule,
    CommonModule,
    AccountModule,
    PagesRoutingModule,
    TitleCasePipe,
    SharedModule,
    TabsModule,
    GalleryModule,
    FileUploadModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    DatePipe,
    ButtonsModule,
    DirectivesModule
  ],
  exports: [HomeComponent, MemberDetailComponent, MemberListComponent, MessagesComponent, ListsComponent, NotFoundComponent, ServerErrorComponent, MemberEditComponent, PhotoEditorComponent, MemberMessagesComponent, AdminPanelComponent, UserManagementComponent, PhotoManagementComponent],
})
export class PagesModule { }
