import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEventsMapComponent } from './client-events-map.component';

describe('ClientEventsMapComponent', () => {
  let component: ClientEventsMapComponent;
  let fixture: ComponentFixture<ClientEventsMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientEventsMapComponent]
    });
    fixture = TestBed.createComponent(ClientEventsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
