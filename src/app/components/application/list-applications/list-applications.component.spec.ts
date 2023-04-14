import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { ApplicationStatus } from 'src/app/enums/application.enum';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';
import { ActivatedRouteStub } from '../../shared/activatedroute-stub';

import { ListApplicationsComponent } from './list-applications.component';

describe('ListApplicationsComponent', () => {
  let component: ListApplicationsComponent;
  let fixture: ComponentFixture<ListApplicationsComponent>;
  let mockActivatedRoute: ActivatedRouteStub;
  let getApplicationsByTripIdSpy: Application[];
  let testApplicationList: Application[];
  let testApplication1: Application;
  let testApplication2: Application;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();
    mockActivatedRoute.testParams = { tripId: '64344f7965cca599602c91a5' };
    testApplicationList = [];

    testApplication1 = new Application();
    testApplication1.requestDate = new Date('2023-04-13');
    testApplication1.status = ApplicationStatus.ACCEPTED;
    testApplication1.comment =
      'Ad sunt sunt consectetur veniam ut. Fugiat sunt aute fugiat ut adipisicing ipsum eiusmod. Laboris ut aliquip anim cillum nostrud proident est fugiat anim esse.';
    testApplication1.rejectedReason = undefined;
    testApplication1.trip_id = '64344f7965cca599602c91a5';
    testApplication1.paidAt = new Date('2023-04-14');

    testApplication2 = new Application();
    testApplication2.requestDate = new Date('2023-04-12');
    testApplication2.status = ApplicationStatus.ACCEPTED;
    testApplication2.comment =
      'Ad sunt sunt consectetur veniam ut. Fugiat sunt aute fugiat ut adipisicing ipsum eiusmod. Laboris ut aliquip anim cillum nostrud proident est fugiat anim esse.';
    testApplication2.rejectedReason = undefined;
    testApplication2.trip_id = '64344f7965cca599602c91a5';
    testApplication2.paidAt = new Date('2023-04-13');

    let applicationsByTripIdSpy = jasmine.createSpyObj('ApplicationService', [
      'getApplicationsByTripId',
    ]);
    getApplicationsByTripIdSpy =
      applicationsByTripIdSpy.getApplicationsByTripId.and.returnValue(
        of(testApplicationList)
      );

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterModule,
      ],
      declarations: [ListApplicationsComponent],
      providers: [
        { provide: ApplicationService, useValue: applicationsByTripIdSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        AngularFireAuth,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list two applications', () => {
    testApplicationList = [testApplication1, testApplication2];
    fixture.detectChanges();
    expect(component.applications.length === 2);
  });

  it('should not list applications', () => {
    fixture.detectChanges();
    expect(component.applications.length === 0);
  });
});
