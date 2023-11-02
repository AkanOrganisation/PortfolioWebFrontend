import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDatetimeSlotsComponent } from './event-datetime-slots.component';

describe('EventDatetimeSlotsComponent', () => {
  let component: EventDatetimeSlotsComponent;
  let fixture: ComponentFixture<EventDatetimeSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDatetimeSlotsComponent]
    });
    fixture = TestBed.createComponent(EventDatetimeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
