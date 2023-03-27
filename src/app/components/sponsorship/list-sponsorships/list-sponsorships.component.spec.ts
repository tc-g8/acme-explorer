import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSponsorshipsComponent } from './list-sponsorships.component';

describe('ListSponsorshipsComponent', () => {
  let component: ListSponsorshipsComponent;
  let fixture: ComponentFixture<ListSponsorshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSponsorshipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSponsorshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
