import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEventsListComponent } from './client-events-list.component';

describe('ClientEventsListComponent', () => {
  let component: ClientEventsListComponent;
  let fixture: ComponentFixture<ClientEventsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientEventsListComponent]
    });
    fixture = TestBed.createComponent(ClientEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
