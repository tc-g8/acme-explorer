import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateApplicationComponent } from './create-application.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormsModule,
  NgForm,
} from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { Application } from 'src/app/models/application.model';
import { ApplicationStatus } from 'src/app/enums/application.enum';
import { of } from 'rxjs';
import { Role } from 'src/app/enums/role.enum';

describe('CreateApplicationComponent', () => {
  let component: CreateApplicationComponent;
  let fixture: ComponentFixture<CreateApplicationComponent>;
  let applicationService: ApplicationService;
  let messageService: MessageService;
  let authService: AuthService;
  let testApplication1: Application;
  let actor: Actor;

  beforeEach(async () => {
    actor = new Actor();
    actor._id = '123';
    actor.role = Role.EXPLORER;
    // actor.password = '123';
    // actor.email = 'hola@test.com';
    // actor.name = 'Test';
    // actor.surname = 'Test';
    // actor.address = 'Test';

    testApplication1 = new Application();
    testApplication1.requestDate = new Date('2023-04-13');
    testApplication1.status = ApplicationStatus.ACCEPTED;
    testApplication1.comment =
      'Ad sunt sunt consectetur veniam ut. Fugiat sunt aute fugiat ut adipisicing ipsum eiusmod. Laboris ut aliquip anim cillum nostrud proident est fugiat anim esse.';
    testApplication1.rejectedReason = undefined;
    testApplication1.trip_id = '64344f7965cca599602c91a5';
    testApplication1.paidAt = new Date('2023-04-14');

    await TestBed.configureTestingModule({
      declarations: [CreateApplicationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule,
      ],
      providers: [ApplicationService, MessageService, AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Injecting the services
    applicationService = TestBed.inject(ApplicationService);
    messageService = TestBed.inject(MessageService);
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply for a trip whose starting date has not yet passed', () => {
    // Mocking the necessary dependencies and component properties
    const form: NgForm = {
      value: {
        comment: 'Test comment',
      },
      reset: () => {},
    } as NgForm;

    // Mocking the applicationService.createApplication method to return a successful response
    spyOn(applicationService, 'createApplication').and.returnValue(
      of(testApplication1)
    );
    // Mocking the messageService.notifyMessage method
    spyOn(messageService, 'notifyMessage');
    spyOn(authService, 'getCurrentActor').and.returnValue(actor);
    component.tripId = '64344f7965cca599602c91a5';
    component.ngOnInit();

    // Simulating the addApplication method call
    component.addApplication(form);

    expect(messageService.notifyMessage).toHaveBeenCalledWith(
      $localize`Application sent`,
      'alert alert-success'
    );
  });
});
