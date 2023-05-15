import { ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  channelId = '';
  channel: any = [];
  threadContent: any = [];
  threadContentIndex: number;
  currentChannelThread: any;
  searchValue: string = '';
  public threadOpen: boolean = false;
  currentUserName: any;
  currentDate = Date.now();
  getDayBeforeMidnightTime = new Date().setHours(-24, 0, 0, 0);
  getLastMidnightTime = new Date().setHours(0, 0, 0, 0);
  getNextMidnightTime = new Date().setHours(24, 0, 0, 0);
  messageDateString: any;
  selectedThread: string = "";
  options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore,
    private usersService: UsersService
    ) { }

  getChannelDetails() {
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .pipe(untilDestroyed(this))
    .subscribe((channel: any) => {
      this.channel = channel;
      this.currentChannelThread = channel.thread;
    });
  }


  openThread(index) {
    this.threadOpen = true;
    this.threadContent = this.channel.thread[index];
    this.threadContentIndex = index;
  }

  isDifferentDay(messageIndex: number, array: any): boolean {
    if (messageIndex === 0) return true;

    const d1 = new Date(array[messageIndex - 1].timestamp);
    const d2 = new Date(array[messageIndex].timestamp);

    return (
      d1.getFullYear() !== d2.getFullYear() ||
      d1.getMonth() !== d2.getMonth() ||
      d1.getDate() !== d2.getDate()
    );
  }

  getMessageDate(messageIndex: number, array: any): string {
    let dateToday = new Date().toLocaleDateString('de-DE', this.options);
    let longDateYesterday = new Date();
    longDateYesterday.setDate(new Date().getDate() - 1);
    let dateYesterday = longDateYesterday.toLocaleDateString('de-DE', this.options);
    let today = dateToday.slice(0, dateToday.length - 5);
    let yesterday = dateYesterday.slice(0, dateToday.length - 5);

    const wholeDate = new Date(
      array[messageIndex].timestamp
    ).toLocaleDateString('de-DE', this.options);

    this.messageDateString = wholeDate.slice(0, wholeDate.length - 5);

    if (
      new Date(array[messageIndex].timestamp).getFullYear() ===
      new Date().getFullYear()
    ) {
      if (this.messageDateString === today) {
        return "Heute";
      } else if (this.messageDateString === yesterday) {
        return "Gestern";
      } else {
        return this.messageDateString;
      }
    } else {
      return wholeDate;
    }
  }
  
}
