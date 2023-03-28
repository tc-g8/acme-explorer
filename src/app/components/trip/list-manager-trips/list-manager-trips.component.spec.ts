import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManagerTripsComponent } from './list-manager-trips.component';

describe('ListManagerTripsComponent', () => {
  let component: ListManagerTripsComponent;
  let fixture: ComponentFixture<ListManagerTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListManagerTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListManagerTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
