import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayTripComponent } from './display-trip.component';
import { TripService } from '../../../services/trip.service';
import { Trip } from '../../../models/trip.model';
import { TripStatus } from 'src/app/enums/trip.enum';
import { ActivatedRouteStub } from '../../shared/activatedroute-stub';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { CountDownComponent } from '../count-down/count-down.component';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationService } from 'src/app/services/application.service';


describe('DisplayTripComponent', () => {
  let component: DisplayTripComponent;
  let fixture: ComponentFixture<DisplayTripComponent>;
  let mockActivatedRoute: ActivatedRouteStub;
  let testTrip: Trip;
  let getTripSpy: any;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();
    mockActivatedRoute.testParams = { id: '64344f7965cca599602c91a4' };

    testTrip = new Trip();
    testTrip.title = 'Rome - The Renacentist';
    testTrip.description =
      'Ad sunt sunt consectetur veniam ut. Fugiat sunt aute fugiat ut adipisicing ipsum eiusmod. Laboris ut aliquip anim cillum nostrud proident est fugiat anim esse.';
    testTrip.status = TripStatus.PUBLISHED;
    testTrip.startDate = new Date('2023-04-20');
    testTrip.endDate = new Date('2023-04-26');
    testTrip.price = 236;
    testTrip.requirements = [
      'Lorem nostrud magna dolor ea magna qui eu et amet.',
      'Nostrud id velit irure dolore officia adipisicing nulla.',
      'Esse dolor dolor officia nostrud ipsum dolore.',
    ];
    testTrip.imageCollection = [];
    testTrip.sponsorships = [];
    testTrip.stages = [];

    let tripSpy = jasmine.createSpyObj('TripService', ['getTrip']);
    getTripSpy = tripSpy.getTrip.and.returnValue(of(testTrip));

    await TestBed.configureTestingModule({
      declarations: [DisplayTripComponent, CountDownComponent],
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterModule
      ],
      providers: [
        { provide: TripService, useValue: tripSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct id', () => {
    expect(component.id).toBe('64344f7965cca599602c91a4');
  });

  it('should load trip correctly', () => {
    expect(component.trip).not.toBeUndefined();
  });

  it('should have correct price', () => {
    fixture.detectChanges();
    expect(component.trip.price).toBe(testTrip.price);
  });

  it('should display correct title', () => {
    let titleDiv = fixture.nativeElement.querySelector('h3.card-title');
    fixture.detectChanges();
    expect(titleDiv.textContent).toContain(testTrip.title);
  });

  it('should not apply for a trip whose starting data has already passed ', () => {
    component.activeRole = 'explorer';
    component.trip.status = TripStatus.PUBLISHED;
    component.hasApplication = false;
    let applyButton = fixture.nativeElement.querySelector('#applyButton');
    fixture.detectChanges();
    expect(applyButton).toBeNull();
  });

  it('should not apply for a trip whose starting date has not yet passed', () => {
    component.activeRole = 'explorer';
    component.trip.status = TripStatus.PUBLISHED;
    component.hasApplication = false;
    
    let today = new Date() ;
    let newDate = new Date(today);
    newDate.setDate(today.getDate() + 5);
    component.trip.startDate = newDate;
    component.trip.isOver = false;
    fixture.detectChanges();

    let applyButton = fixture.nativeElement.querySelector('#applyButton');
    fixture.detectChanges();
    expect(applyButton).not.toBeNull();
  });
  
});
