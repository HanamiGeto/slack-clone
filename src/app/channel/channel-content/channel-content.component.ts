import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../../services/channel.service';
import { UsersService } from '../../services/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarService } from 'src/app/services/sidebar.service';

@UntilDestroy()
@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss']
})
export class ChannelContentComponent implements OnInit {
  sticky: boolean = false;
  @ViewChildren('stickyChip', { read: ElementRef }) chips: QueryList<ElementRef>;
  @ViewChildren('messages') messages: QueryList<any>
  @ViewChild('contentContainer') container: ElementRef;
  menuPosition: any;
  public responsiveView: boolean;
  scrolledToBottom = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public channelService: ChannelService,
    public usersService: UsersService,
    public sidenav: SidebarService,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
      this.channelService.channelId = paramMap.get('id');
      this.channelService.getChannelDetails();
    });
    this.sidenav.getValue().pipe(untilDestroyed(this)).subscribe((value) => {
      this.responsiveView = value;
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
    if(this.channelService.selectedThread !== '')  
    this.router.navigate([], {fragment: this.channelService.selectedThread.toString()}).then((res) => {
      const element = document.getElementById(this.channelService.selectedThread.toString())
      if (element != undefined) {
        element.scrollIntoView({behavior: "smooth"});
        element.classList.add('selected');
        setTimeout(() => {
          element.classList.remove('selected');
          this.channelService.selectedThread = ''
        }, 5500)
      }
    })
    }, 1000);
    
  }
   
   ngAfterViewChecked() {        
       this.scrollToBottom();        
   } 

   scrollToBottom(): void {
       try {
         if(!this.scrolledToBottom){
            this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
         }   
       } catch(err) { }                 
   }

   onScroll(){
     this.scrolledToBottom = true;
   }

  toggleSidenav() {
    this.sidenav.toggle();
 }
}
