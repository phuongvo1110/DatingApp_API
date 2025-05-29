import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, public accountService: AccountService, private router: Router, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: [ '', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  form!: FormGroup;
  
  login() {
    if (this.form.invalid) {
      return;
    }
    const loginValue = {
      userName: this.form.value.userName,
      password: this.form.value.password,
    }
    this.accountService.login(loginValue.userName, loginValue.password).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error)}
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
