import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: any[] = [];
  constructor(private userService: UserService) {
  
    }
  ngOnInit(): void {
    // this.getUsers();
  }
  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.result
      }
    })
  }
  onCancelRegister(e: any) {
    this.registerMode = e;
  }
}
