import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserRegister } from '../../models/user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
      knownAs: ['', [Validators.required]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      dateOfBirth: [null as NgbDateStruct | null, Validators.required],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () =>
        this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
    });
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { isMatching: true };
    };
  }
  get f() {
    return this.registerForm.controls;
  }
  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    const dob: NgbDateStruct = this.registerForm.controls['dateOfBirth'].value;
    const formattedDob = dob
      ? `${dob.year}-${dob.month.toString().padStart(2, '0')}-${dob.day
          .toString()
          .padStart(2, '0')}`
      : null;
    const userValue: UserRegister = {
      userName: this.registerForm.controls['userName'].value,
      password: this.registerForm.controls['password'].value,
      knownAs: this.registerForm.controls['knownAs'].value,
      gender: this.registerForm.controls['gender'].value,
      city: this.registerForm.controls['city'].value,
      country: this.registerForm.controls['country'].value,
      dateOfBirth: formattedDob as string,
    };
    this.accountService.register(userValue).subscribe({
      next: (response: any) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => this.toastr.error(error),
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
