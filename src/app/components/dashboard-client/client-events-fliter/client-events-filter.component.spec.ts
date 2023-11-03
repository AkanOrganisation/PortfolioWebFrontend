import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEventsFilterComponent } from './client-events-filter.component';

describe('ClientEventsFliterComponent', () => {
  let component: ClientEventsFilterComponent;
  let fixture: ComponentFixture<ClientEventsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientEventsFilterComponent]
    });
    fixture = TestBed.createComponent(ClientEventsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
