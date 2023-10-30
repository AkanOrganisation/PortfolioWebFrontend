import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEventDatetimeComponent } from './app-event-datetime.component';

describe('AppEventDatetimeComponent', () => {
  let component: AppEventDatetimeComponent;
  let fixture: ComponentFixture<AppEventDatetimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppEventDatetimeComponent]
    });
    fixture = TestBed.createComponent(AppEventDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
