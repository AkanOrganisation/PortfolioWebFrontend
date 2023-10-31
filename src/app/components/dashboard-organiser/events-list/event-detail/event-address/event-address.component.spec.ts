import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddressComponent } from './event-address.component';

describe('EventLocationComponent', () => {
  let component: EventAddressComponent;
  let fixture: ComponentFixture<EventAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventAddressComponent]
    });
    fixture = TestBed.createComponent(EventAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
