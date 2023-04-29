import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Stage } from 'src/app/models/stage.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-form-trip',
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.css'],
})
export class FormTripComponent implements OnInit {
  tripForm: FormGroup;
  imagesCollection: string[];
  stagesCollection: Stage[];
  price: number;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private authService: AuthService
  ) {
    this.tripForm = this.fb.group({
      manager_id: [''],
      title: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      requirements: [''],
    });

    this.price = 0;
    this.stagesCollection = [];
    this.imagesCollection = [];
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {}

  onSubmit() {
    const formModel = this.tripForm.value;
    const newTrip = {
      ...formModel,
      imageColletion: this.imagesCollection,
      stages: this.stagesCollection,
    };
    newTrip.requirements = this.splitRequirement(newTrip.requirements);

    const trip: Trip = newTrip as Trip;
    trip.manager_id = this.authService.getCurrentActor()!._id;
    console.log(trip);
    this.tripService.createTrip(trip).subscribe((res) => {
      console.log('Trip created');
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertBase64(file).then((encodedImage) => {
        this.imagesCollection.push(encodedImage as string);
      });
    }
  }

  removeImage(image: string) {
    this.imagesCollection = this.imagesCollection.filter(
      (i: string) => i != image
    );
  }

  onAddStage(form: NgForm) {
    const stageTitle = form.value.stageTitle;
    const stageDescription = form.value.stageDescription;
    const stagePrice = form.value.stagePrice;

    const newStage = new Stage();
    newStage.title = stageTitle;
    newStage.description = stageDescription;
    newStage.price = stagePrice;

    if (this.stagesCollection.length > 0) {
      const lastStage = this.stagesCollection[this.stagesCollection.length - 1];
      newStage._id = String(Number(lastStage._id) + 1);
    }

    this.stagesCollection.push(newStage);
  }

  removeStage(stage: Stage) {
    this.stagesCollection = this.stagesCollection.filter(
      (s: Stage) => s._id != stage._id
    );
  }

  private convertBase64(file: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  private splitRequirement(requirements: string): string[] {
    return requirements
      .split('-')
      .map((req) => req.trim())
      .filter((req) => req.length > 0);
  }
}
