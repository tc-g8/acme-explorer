import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExplorerApplicationsComponent } from './list-applications.component';

describe('ListExplorerApplicationsComponent', () => {
  let component: ListExplorerApplicationsComponent;
  let fixture: ComponentFixture<ListExplorerApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExplorerApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExplorerApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
