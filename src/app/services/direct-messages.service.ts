import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class DirectMessagesService {
  channelID: string;
  selectedChannelID: string;
  currentChannelMessages: any;
  currentChannelRecipient: any;
  currentChannelPayload: any;
  currentChannelData: any;
  allDmChannels: Array<any> = [];
  userExists: boolean = false;
  onlyExistingUsers: boolean = false;
  
  constructor(
    private afs: AngularFirestore,
    private route: Router,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  /**
   * Retrieves all chats from the data base
   */
  async getChatsFromDb() {
    this.afs
      .collection('direct-messages')
      .doc(this.channelID)
      .valueChanges()
      .pipe(untilDestroyed(this))
      .subscribe((channel: any) => {
        this.currentChannelMessages = channel.payload.messages;
        this.currentChannelRecipient = channel.users.recipientID;
        this.currentChannelPayload = channel.payload.messages;
        this.currentChannelData = channel;
      });
  }
  /**
   * subcribes to the direct messages collection and returns all chats the curretUser is participating in
   */
  getAllDms(): void {
    this.afs
      .collection('direct-messages')
      .valueChanges({ idField: 'dmChannelId' })
      .pipe(untilDestroyed(this))
      .subscribe((channels: any) => {
        this.allDmChannels = [];
        channels.forEach((channel) => {
          if (channel.users.senderID == this.usersService.currentUserDataID)
            this.allDmChannels.push(channel);
            this.sortUsersByName();
        });
      });
  }

  /**
   * sorts all users by their name displayed in the direct messages component
   */
  sortUsersByName() {
    this.allDmChannels.sort((a, b) => {
      if (
        a.users.recipientName.toLowerCase() <
        b.users.recipientName.toLowerCase()
      ) {
        return -1;
      } else if (
        a.users.recipientName.toLowerCase() >
        b.users.recipientName.toLowerCase()
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  /**
   * sets the user data json that used to add to data to the dm channel collection
   * @param uid - unique identifier of user
   * @param name - user name 
   */
  setUserData(uid: string, name: string) {
    const channelData = {
      users: {
        senderID: this.usersService.currentUserData.uid,
        senderName: this.usersService.currentUserData.displayName,
        recipientID: uid,
        recipientName: name,
      },
      payload: {
        messages: [],
      },
    };
    return channelData
  }

  /**
   * determines if a user exists within the user collection
   * and if the user exists and hasn't already been assigned a channel with the 
   * currentuser then a new channel is created
   * @param uid - unique identifier of user 
   * @param channelRef - referrence to the collection the data gets posted to 
   * @param channelData - Object data representing the channel data
   */
  userIsValid(uid, channelRef, channelData) {
    if (uid !== "") {
      const indexOfUser = this.allDmChannels.findIndex((channel) => channel.users.recipientID === uid);
      indexOfUser > -1 ? (this.userExists = true) && (this.onlyExistingUsers = false) : channelRef.add(channelData).then((channel) => {
        this.route.navigate(['/home/direct-messages/' + channel.id]);
        return this.dialog.closeAll();
      })
    } else {
      this.onlyExistingUsers = true;
      this.userExists = false;
    }
  }


  /**
   * creates a direct message channel
   * @param uid unique identifier that represents each users collection id
   * @param name name of selected user for dm channel
   */ 
  async createDmChannel(uid: string, name: string) {
    const channelRef: AngularFirestoreCollection = this.afs.collection('direct-messages');
    const channelData = this.setUserData(uid, name)
    this.userIsValid(uid, channelRef, channelData)
    
  }
}
