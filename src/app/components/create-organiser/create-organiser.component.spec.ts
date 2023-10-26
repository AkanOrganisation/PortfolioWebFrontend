import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganiserComponent } from './create-organiser.component';

describe('CreateOrganiserComponent', () => {
  let component: CreateOrganiserComponent;
  let fixture: ComponentFixture<CreateOrganiserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrganiserComponent]
    });
    fixture = TestBed.createComponent(CreateOrganiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
