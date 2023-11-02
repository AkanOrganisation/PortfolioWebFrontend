import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDatetimeStatusComponent } from './event-datetime-status.component';

describe('EventDatetimeStatusComponent', () => {
  let component: EventDatetimeStatusComponent;
  let fixture: ComponentFixture<EventDatetimeStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDatetimeStatusComponent]
    });
    fixture = TestBed.createComponent(EventDatetimeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
