import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UsersService } from '../services/users.service';
import { ChannelService } from '../services/channel.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DirectMessagesService } from '../services/direct-messages.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent {
  url: any;

  constructor(
    public afAuth: Auth,
    private afs: AngularFirestore,
    private dialog: MatDialog,
    public usersService: UsersService,
    public channelService: ChannelService,
    public dmService: DirectMessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {  router.events.pipe(
    filter(event => event instanceof NavigationEnd)  
  ).subscribe((event: NavigationEnd) => {
    this.url = event.url;
  }); }

  checkRoute() {
    if (this.route.firstChild != null) {
      return this.route.firstChild.url['value'][0].path != 'direct-messages';
    } else {
      return '';
    }
  }

  showChannelPlaceholder() {
    if (this.url.includes('channel')) {
      return 'In #' + this.channelService.channel.name + ' suchen';
    } else if (this.url.includes('threads-list')) {
      return 'In Threads suchen';
    } else if (this.url.includes('user-list')) {
      return 'In Users suchen';
    } else {
      return '';
    }
  }


  openDialog() {
    this.dialog.open(UserDetailComponent);
  }


  clearInput() {
    this.channelService.searchValue = '';
  }

  /**
   * firebase function is used to log out the currently logged in user
   */
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.afs
        .collection('users')
        .doc(this.usersService.currentUserDataID)
        .update({ status: false });
    });
  }
}
