import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import ResizeObserver from 'resize-observer-polyfill';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from '../services/sidebar.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public currentRoute: any;
  public innerWidth: any;
  public responsiveView: boolean;
  @ViewChild('channelContent') content: ElementRef;
  @ViewChild('drawer') public sidenav: MatSidenav;

  constructor(
    public usersService: UsersService,
    public channelService: ChannelService,
    private router: Router,
    private sidenavService: SidebarService
  ) {

  }

  ngOnInit(): void {
    this.usersService.getAllUsers();
    this.usersService.getCurrentUser();
    this.sidenavService.getValue().subscribe((value) => {
      this.responsiveView = value;
    })
  }

  ngAfterViewInit() {
    this.elementObserver();
    this.sidenavService.setSidenav(this.sidenav);
  }

  checkRoute() {
    return this.router.url === '/home' ||
      this.router.url === '/home/threads-list' ||
      this.router.url === '/home/user-list'
      ? false
      : true;
  }

  @HostListener('document:mouseup', ['$event'])
  DocumentClick(event: Event) {
    if (!this.sidenav._content.nativeElement.contains(event.target as HTMLElement) && this.responsiveView) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

  elementObserver() {
    let ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        const cr = entry.contentRect;
    
        if (window.innerWidth <= 800 || cr.width <= 400 && this.channelService.threadOpen) {
          this.sidenavService.setValue(true);
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else if (cr.width <= 693) {
          document.querySelectorAll('.answers').forEach((el) => {
            (el as HTMLElement).style.width = '100%';
          });
        } else {
          this.sidenavService.setValue(false);
          this.sidenav.mode = 'side';
          this.sidenav.open();
          document.querySelectorAll('.answers').forEach((el) => {
            (el as HTMLElement).style.width = '600px';
          });
        }
      }
    });

    // Element for which to observe height and width 
    ro.observe(this.content.nativeElement);
  }
}
