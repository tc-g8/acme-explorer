import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySponsorshipComponent } from './display-sponsorship.component';

describe('DisplaySponsorshipComponent', () => {
  let component: DisplaySponsorshipComponent;
  let fixture: ComponentFixture<DisplaySponsorshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySponsorshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
