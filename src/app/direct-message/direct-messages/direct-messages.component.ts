import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateDirectMessageComponent } from '../dialog-create-direct-message/dialog-create-direct-message.component';
import { DirectMessagesService } from '../../services/direct-messages.service';
import { UsersService } from '../../services/users.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelService } from '../../services/channel.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent implements OnInit {
  collapsed = false;
  users = [];
  allDmChannels1: Array<any> = [];
  public responsiveView: boolean;

  constructor(
    public dialog: MatDialog,
    public dmService: DirectMessagesService,
    public usersService: UsersService,
    public afs: AngularFirestore,
    public channelService: ChannelService,
    public sidenav: SidebarService
  ) {}

  ngOnInit(): void {
    this.dmService.getAllDms();
    this.sidenav.getValue().pipe(untilDestroyed(this)).subscribe((value) => {
      this.responsiveView = value;
    })
  }

  openDialog() {
    this.dialog.open(DialogCreateDirectMessageComponent);
    this.dmService.userExists = false;
    this.dmService.onlyExistingUsers = false;
  }

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

}
