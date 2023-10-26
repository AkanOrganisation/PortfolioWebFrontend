import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrganiserComponent } from './dashboard-organiser.component';

describe('DashboardOrganiserComponent', () => {
  let component: DashboardOrganiserComponent;
  let fixture: ComponentFixture<DashboardOrganiserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOrganiserComponent]
    });
    fixture = TestBed.createComponent(DashboardOrganiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
