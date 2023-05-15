import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from '../services/users.service';
import { ChannelService } from '../services/channel.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { doc, where } from 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';

@UntilDestroy()
@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  styleUrls: ['./threads-list.component.scss'],
})
export class ThreadsListComponent implements OnInit {
  allChannels: any = [];
  ownThreads: any = [];
  public responsiveView: boolean;

  constructor(
    private firestore: AngularFirestore,
    public usersService: UsersService,
    public channelService: ChannelService,
    private route: ActivatedRoute,
    private router: Router,
    public scroller: ViewportScroller,
    public sidenav: SidebarService
  ) {}

  ngOnInit() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'channelId' })
      .pipe(untilDestroyed(this))
      .subscribe((channels: any) => {
        this.allChannels = channels;
        this.getOwnThreads();
      });
      this.sidenav.getValue().pipe(untilDestroyed(this)).subscribe((value) => {
        this.responsiveView = value;
      })
  }

  getOwnThreads() {
    this.ownThreads = [];
    this.allChannels.forEach((e) => {
      e.thread?.forEach((element) => {
        if (element.author == this.usersService.currentUserDataID) {
          this.ownThreads.push({
            elem: element,
            name: e.name,
            channelId: e.channelId
          });
          this.ownThreads.sort(function (x, y) {
            return y.elem.timestamp - x.elem.timestamp;
          });
        }
      });
    });
  }

  goToChannel(index) {
    this.router.navigate(['/home/channel/' + this.ownThreads[index].channelId]).then(() => {
      this.channelService.selectedThread = this.ownThreads[index].elem.timestamp
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
 }
}
