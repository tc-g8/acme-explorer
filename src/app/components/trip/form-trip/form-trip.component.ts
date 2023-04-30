import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { Stage } from 'src/app/models/stage.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { validatePresentDate } from 'src/app/utils/dates';
import { convertBase64 } from 'src/app/utils/images';
import { splitRequirement } from 'src/app/utils/trips';

@Component({
  selector: 'app-form-trip',
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.css'],
})
export class FormTripComponent implements OnInit {
  tripForm: FormGroup;
  imagesCollection: Image[];
  stagesCollection: Stage[];
  tripPrice: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tripService: TripService,
    private authService: AuthService
  ) {
    this.tripForm = this.fb.group({
      manager_id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', [Validators.required, validatePresentDate]],
      endDate: ['', [Validators.required, validatePresentDate]],
      requirements: ['', Validators.required],
      stages: ['', Validators.required],
    });

    this.tripPrice = 0;
    this.stagesCollection = [];
    this.imagesCollection = [];
  }

  ngOnInit(): void {}

  onSubmit() {
    const formModel = this.tripForm.value;
    const newTrip = {
      ...formModel,
      imageCollection: this.imagesCollection,
      stages: this.stagesCollection,
    };
    newTrip.requirements = splitRequirement(newTrip.requirements);
    newTrip.stages.forEach((stage: any) => delete stage._id);

    const trip: Trip = newTrip as Trip;
    trip.manager_id = this.authService.getCurrentActor()!._id;

    this.tripService.createTrip(trip).subscribe({
      next: (_) => this.router.navigate([`/trips/manager/${trip.manager_id}`]),
      error: (e) => console.error(e),
      complete: () => console.info('POST Completed'),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      convertBase64(file).then((encodedImage) => {
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

    this.tripPrice += stagePrice;
    this.stagesCollection.push(newStage);
    this.tripForm.controls['stages'].setValue(this.stagesCollection);
    form.resetForm();
  }

  removeStage(stage: Stage) {
    this.stagesCollection = this.stagesCollection.filter(
      (s: Stage) => s._id != stage._id
    );

    if (this.stagesCollection.length > 0) {
      this.tripPrice = this.stagesCollection
        .map((stage) => stage.price)
        .reduce((abs, price) => abs + price);
    } else {
      this.tripPrice = 0;
      this.tripForm.controls['stages'].setValue(this.stagesCollection);
    }
  }

  get title() {
    return this.tripForm.get('title');
  }
  get description() {
    return this.tripForm.get('description');
  }
  get startDate() {
    return this.tripForm.get('startDate');
  }
  get endDate() {
    return this.tripForm.get('endDate');
  }
  get requirements() {
    return this.tripForm.get('requirements');
  }
  get stages() {
    return this.tripForm.get('stages');
  }
}
