import { Component, OnInit } from '@angular/core';
import { IUserJwt } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userName: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('core_token');

    const data = this.userService.decodeToken(token as string) as IUserJwt;

    this.userName = data.name;
  }
}
