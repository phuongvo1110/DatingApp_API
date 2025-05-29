import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PagesModule } from './pages/pages.module';
import { AccountModule } from './account/account.module';
import { LayoutComponent } from './layout/layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { errorInterceptor } from './interceptors/error.interceptor';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { TimeagoModule } from "ngx-timeago";
import { LayoutModule } from './layout/layout.module';
import { BsModalService, ModalModule, } from 'ngx-bootstrap/modal';
import { MessageService } from './services/message.service';
import { ConfirmService } from './services/confirm.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule,
    PagesModule,
    AccountModule,
    LayoutModule,
    TitleCasePipe,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
    }),
    NgxSpinnerModule,
    TimeagoModule.forRoot(),
    ModalModule
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor, loadingInterceptor ])),
    BsModalService,
    MessageService,
    ConfirmService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
