import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTripsComponent } from './list-trips.component';
import { Trip } from 'src/app/models/trip.model';
import { of } from 'rxjs';
import { TripService } from 'src/app/services/trip.service';
import { TripStatus } from 'src/app/enums/trip.enum';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActivatedRouteStub } from '../../shared/activatedroute-stub';

describe('ListTripsComponent', () => {
  let component: ListTripsComponent;
  let fixture: ComponentFixture<ListTripsComponent>;
  let mockActivatedRoute: ActivatedRouteStub;
  let testTrip1: Trip;
  let testTrip2: Trip;
  let testTrips: Trip[];
  let getTripSpy: any;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();

    testTrip1 = new Trip();
    testTrip1.title = 'Rome - The Renacentist';
    testTrip1.description =
      'Ad sunt sunt consectetur veniam ut. Fugiat sunt aute fugiat ut adipisicing ipsum eiusmod. Laboris ut aliquip anim cillum nostrud proident est fugiat anim esse.';
    testTrip1.status = TripStatus.PUBLISHED;
    testTrip1.startDate = new Date('2023-04-20');
    testTrip1.endDate = new Date('2023-04-26');
    testTrip1.price = 236;
    testTrip1.requirements = [
      'Lorem nostrud magna dolor ea magna qui eu et amet.',
      'Nostrud id velit irure dolore officia adipisicing nulla.',
      'Esse dolor dolor officia nostrud ipsum dolore.',
    ];
    testTrip1.imageCollection = [];
    testTrip1.sponsorships = [];
    testTrip1.stages = [];

    testTrip2 = new Trip();
    testTrip2.title = 'Paris - The City of Love';
    testTrip2.description =
      'Ad sunt sunt consectetur veniam ut. Fugiat sunt aute fugiat ut adipisicing ipsum eiusmod. Laboris ut aliquip anim cillum nostrud proident est fugiat anim esse.';
    testTrip2.status = TripStatus.PUBLISHED;
    testTrip2.startDate = new Date('2023-05-20');
    testTrip2.endDate = new Date('2023-05-26');
    testTrip2.price = 236;
    testTrip2.requirements = [
      'Lorem nostrud magna dolor ea magna qui eu et amet.',
      'Nostrud id velit irure dolore officia adipisicing nulla.',
      'Esse dolor dolor officia nostrud ipsum dolore.',
    ];
    testTrip2.imageCollection = [];
    testTrip2.sponsorships = [];
    testTrip2.stages = [];

    testTrips = [testTrip1, testTrip2];

    let tripSpy = jasmine.createSpyObj('TripService', ['getTrips']);
    getTripSpy = tripSpy.getTrips.and.returnValue(of(testTrips));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule,
        RouterModule,
      ],
      declarations: [ListTripsComponent],
      providers: [
        { provide: TripService, useValue: tripSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        AngularFireAuth,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list two trips', () => {
    fixture.detectChanges();
    expect(component.trips.length === 2);
  });

  it('should list correct trip', () => {
    let titleDiv = fixture.nativeElement.querySelector('h4.card-title');
    fixture.detectChanges();
    expect(titleDiv.textContent).toContain(testTrip1.title);
  });

  it('should not list trip', () => {
    component.trips = [];
    fixture.detectChanges();
    let titleDiv = fixture.nativeElement.querySelector('h4.card-title');
    expect(titleDiv).toBeNull();
  });
});
