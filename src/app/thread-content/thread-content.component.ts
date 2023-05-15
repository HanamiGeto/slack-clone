import { Component } from '@angular/core';
import { ChannelContentComponent } from '../channel/channel-content/channel-content.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelService } from '../services/channel.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-thread-content',
  templateUrl: './thread-content.component.html',
  styleUrls: ['./thread-content.component.scss']
})
export class ThreadContentComponent {

  constructor(
    public channelService: ChannelService,
    public usersService: UsersService) { }

}
