import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateDirectMessageComponent } from './dialog-create-direct-message.component';

describe('DialogCreateDirectMessageComponent', () => {
  let component: DialogCreateDirectMessageComponent;
  let fixture: ComponentFixture<DialogCreateDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateDirectMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
