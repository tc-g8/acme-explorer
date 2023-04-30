import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { validatePresentDate } from 'src/app/utils/dates';
import { convertBase64 } from 'src/app/utils/images';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
})
export class EditTripComponent implements OnInit {
  tripId: string;
  tripForm: FormGroup;
  imagesCollection: Image[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tripService: TripService,
    private fb: FormBuilder
  ) {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', [Validators.required, validatePresentDate]],
      endDate: ['', [Validators.required, validatePresentDate]],
      requirements: ['', Validators.required],
    });

    this.imagesCollection = [];
    this.tripId = '';
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

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['id'];
    if (this.tripId) {
      this.tripService.getTrip(this.tripId).subscribe((data: any) => {
        const trip: Trip = data as Trip;
        if (trip) {
          this.imagesCollection = trip.imageCollection;
          this.tripForm.controls['title'].setValue(trip.title);
          this.tripForm.controls['description'].setValue(trip.description);
          this.tripForm.controls['startDate'].setValue(trip.startDate);
          this.tripForm.controls['endDate'].setValue(trip.endDate);
          this.tripForm.controls['requirements'].setValue(trip.requirements);
        }
      });
    }
  }

  onSubmit(): void {
    console.log('Sending data...');
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
}
