import { Component, OnInit } from '@angular/core';
import { DirectMessagesService } from '../services/direct-messages.service';
import { UsersService } from '../services/users.service';
import { ChannelService } from '../services/channel.service';
import { SidebarService } from '../services/sidebar.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public responsiveView: boolean;

  constructor(
    public dmService: DirectMessagesService,
    public usersService: UsersService,
    public channelService: ChannelService,
    public sidenav: SidebarService
  ) {}

  ngOnInit() {
    this.sidenav.getValue().pipe(untilDestroyed(this)).subscribe((value) => {
      this.responsiveView = value;
    })
  }

  toggleSidenav() {
    this.sidenav.toggle();
 }
}
