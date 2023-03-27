import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavouritesComponent } from './list-favourites.component';

describe('ListFavouritesComponent', () => {
  let component: ListFavouritesComponent;
  let fixture: ComponentFixture<ListFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFavouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
