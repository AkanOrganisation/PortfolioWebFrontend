import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDatetimeMemberComponent } from './event-datetime-member.component';

describe('EventDatetimeMemberComponent', () => {
  let component: EventDatetimeMemberComponent;
  let fixture: ComponentFixture<EventDatetimeMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDatetimeMemberComponent]
    });
    fixture = TestBed.createComponent(EventDatetimeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
