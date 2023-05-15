import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DirectMessagesService } from '../services/direct-messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public usersService: UsersService, public dmService: DirectMessagesService) {
    
  }
  ngOnInit(): void {
    this.usersService.getAllUsers()
    this.usersService.getCurrentUser()
  }
}
