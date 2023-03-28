import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTripApplicationsComponent } from './list-trip-applications.component';

describe('ListTripApplicationsComponent', () => {
  let component: ListTripApplicationsComponent;
  let fixture: ComponentFixture<ListTripApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTripApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTripApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
