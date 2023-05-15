import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelService } from '../../services/channel.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarService } from 'src/app/services/sidebar.service';


@UntilDestroy()
@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  collapsed = false;
  channels$: Observable<any>;
  allChannel: Array<any>;
  public responsiveView: boolean;

  constructor(
    public dialog: MatDialog, 
    private firestore: AngularFirestore,
    public channelService: ChannelService,
    public sidenav: SidebarService
    ) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({idField: 'channelId'})
      .subscribe((changes: any) => {
        this.allChannel = changes;
        this.allChannel.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        });
      })
      this.sidenav.getValue().pipe(untilDestroyed(this)).subscribe((value) => {
        this.responsiveView = value;
      })
  }

  openDialog() {
    this.dialog.open(DialogCreateChannelComponent);
  }

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

}
