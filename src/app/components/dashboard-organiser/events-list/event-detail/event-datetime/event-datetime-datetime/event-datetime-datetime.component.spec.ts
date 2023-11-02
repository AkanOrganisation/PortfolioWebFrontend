import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDatetimeDatetimeComponent } from './event-datetime-datetime.component';

describe('EventDatetimeDatetimeComponent', () => {
  let component: EventDatetimeDatetimeComponent;
  let fixture: ComponentFixture<EventDatetimeDatetimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDatetimeDatetimeComponent]
    });
    fixture = TestBed.createComponent(EventDatetimeDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
