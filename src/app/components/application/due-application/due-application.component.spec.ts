import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueApplicationComponent } from './due-application.component';

describe('DueApplicationComponent', () => {
  let component: DueApplicationComponent;
  let fixture: ComponentFixture<DueApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
