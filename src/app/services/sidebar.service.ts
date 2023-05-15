import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public responsiveView: BehaviorSubject<boolean>;
  private sidenav: MatSidenav;

  constructor() { this.responsiveView = new BehaviorSubject<boolean>(false) }

  getValue(): Observable<boolean> {
    return this.responsiveView.asObservable();
  }

  setValue(newValue): void {
    this.responsiveView.next(newValue);
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}