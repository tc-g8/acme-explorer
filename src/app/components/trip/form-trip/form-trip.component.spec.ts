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

  it('should correct validate new trip', () => {
    component.tripForm.controls['manager_id'].setValue("64344f7965cca599602c91a5");
    component.tripForm.controls['title'].setValue("Test1");
    component.tripForm.controls['description'].setValue("Jungle party");
    component.tripForm.controls['startDate'].setValue((new Date("2023-07-01")));
    component.tripForm.controls['endDate'].setValue((new Date("2023-07-06")));
    component.tripForm.controls['requirements'].setValue(["Requirement1"]);
    component.tripForm.controls['stages'].setValue({title: "Stage1", description: "Stage1 description", price: 1000});
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#saveTripBtn');
    expect(button.disabled).toBeFalsy();
  });

  it('should invalid validate new trip', () => {
    component.tripForm.controls['manager_id'].setValue("64344f7965cca599602c91a5");
    component.tripForm.controls['title'].setValue("Test1");
    component.tripForm.controls['description'].setValue("Jungle party");
    component.tripForm.controls['startDate'].setValue((new Date("2023-07-01")));
    component.tripForm.controls['endDate'].setValue((new Date("2023-02-06")));
    component.tripForm.controls['requirements'].setValue(["Requirement1"]);
    component.tripForm.controls['stages'].setValue({title: "Stage1", description: "Stage1 description", price: 1000});
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#saveTripBtn');
    expect(button.disabled).toBeTruthy();
  });

});
