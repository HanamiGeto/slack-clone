import { Component, OnInit } from '@angular/core';
import { DirectMessagesService } from '../../services/direct-messages.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ChannelService } from 'src/app/services/channel.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarService } from 'src/app/services/sidebar.service';

@UntilDestroy()
@Component({
  selector: 'app-direct-messages-content',
  templateUrl: './direct-messages-content.component.html',
  styleUrls: ['./direct-messages-content.component.scss'],
})
export class DirectMessagesContentComponent implements OnInit {
  currMessages: any;
  public responsiveView: boolean;

  constructor(
    public dmService: DirectMessagesService,
    private route: ActivatedRoute,
    public usersService: UsersService,
    public channelService: ChannelService,
    public sidenav: SidebarService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((paramMap) => {
      this.dmService.channelID = paramMap.get('id');
      this.dmService.getChatsFromDb();
    });
    this.sidenav.getValue().pipe(untilDestroyed(this)).subscribe((value) => {
      this.responsiveView = value;
    })
  }

  toggleSidenav() {
    this.sidenav.toggle();
 }
}
