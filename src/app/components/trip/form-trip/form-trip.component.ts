import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Image } from 'src/app/models/image.model';
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
  imagesCollection: Image[];
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
      imageCollection: this.imagesCollection,
      stages: this.stagesCollection,
    };
    newTrip.requirements = this.splitRequirement(newTrip.requirements);
    newTrip.stages.forEach((stage: any) => delete stage._id);

    const trip: Trip = newTrip as Trip;
    trip.manager_id = this.authService.getCurrentActor()!._id;

    this.tripService.createTrip(trip).subscribe({
      next: (res) => console.log('Trip created'),
      error: (e) => console.error(e),
      complete: () => console.info('POST Completed'),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertBase64(file).then((encodedImage) => {
        const image = encodedImage as string;
        const alt = file.name;
        this.imagesCollection.push({ image, alt } as Image);
      });
    }
  }

  removeImage(image: string) {
    this.imagesCollection = this.imagesCollection.filter(
      (i: Image) => i.image != image
    );
  }

  onAddStage(form: NgForm) {
    const stageTitle = form.value.stageTitle;
    const stageDescription = form.value.stageDescription;
    const stagePrice = form.value.stagePrice;

    const newStage: Stage = {
      title: stageTitle,
      description: stageDescription,
      price: stagePrice,
    } as Stage;

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
