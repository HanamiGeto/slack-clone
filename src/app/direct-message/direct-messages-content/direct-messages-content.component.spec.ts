import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessagesContentComponent } from './direct-messages-content.component';

describe('DirectMessagesContentComponent', () => {
  let component: DirectMessagesContentComponent;
  let fixture: ComponentFixture<DirectMessagesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectMessagesContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectMessagesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
