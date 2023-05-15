import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-create-channel',
  templateUrl: './dialog-create-channel.component.html',
  styleUrls: ['./dialog-create-channel.component.scss']
})
export class DialogCreateChannelComponent {
  channelName: string = '';
  channels$: Observable<any>;
  channelsList: Array<any>;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private router: Router) { }

  addChannel() {
    this.firestore
      .collection('channels')
      .add({ 
        name: this.channelName,
        thread: []
      })
      .then((result: any) => {
        this.dialog.closeAll();
        this.router.navigate(['/home/channel/' + result.id])
      });
  }
}
