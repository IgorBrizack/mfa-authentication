import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserJwt } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userName: string = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('core_token');

    const data = this.userService.decodeToken(token as string) as IUserJwt;

    this.userName = data.name;
  }

  doLogout() {
    localStorage.removeItem('core_token');
    this.router.navigate(['/login']);
  }
}
