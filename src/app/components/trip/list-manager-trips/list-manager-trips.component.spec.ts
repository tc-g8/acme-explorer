import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteStub } from '../../shared/activatedroute-stub';
import { ListManagerTripsComponent } from './list-manager-trips.component';
import { ActivatedRoute } from '@angular/router';

describe('ListManagerTripsComponent', () => {
  let component: ListManagerTripsComponent;
  let fixture: ComponentFixture<ListManagerTripsComponent>;
  let mockActivatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        AngularFireAuth,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      declarations: [ListManagerTripsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListManagerTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
