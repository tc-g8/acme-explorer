import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormTripComponent } from './form-trip.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';

describe('FormTripComponent', () => {
  let component: FormTripComponent;
  let fixture: ComponentFixture<FormTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTripComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
