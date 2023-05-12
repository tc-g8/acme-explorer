import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishTripComponent } from './publish-trip.component';

describe('PublishTripComponent', () => {
  let component: PublishTripComponent;
  let fixture: ComponentFixture<PublishTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
