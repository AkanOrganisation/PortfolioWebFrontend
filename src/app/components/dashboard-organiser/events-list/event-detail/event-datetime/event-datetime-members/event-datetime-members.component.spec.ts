import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDatetimeMembersComponent } from './event-datetime-members.component';

describe('EventDatetimeMembersComponent', () => {
  let component: EventDatetimeMembersComponent;
  let fixture: ComponentFixture<EventDatetimeMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDatetimeMembersComponent]
    });
    fixture = TestBed.createComponent(EventDatetimeMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
