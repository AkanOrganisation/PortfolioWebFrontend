import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddDatetimeComponent } from './event-add-datetime.component';

describe('EventAddDatetimeComponent', () => {
  let component: EventAddDatetimeComponent;
  let fixture: ComponentFixture<EventAddDatetimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventAddDatetimeComponent]
    });
    fixture = TestBed.createComponent(EventAddDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
