import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripStatus } from 'src/app/enums/trip.enum';
import { Image } from 'src/app/models/image.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { validatePresentDate } from 'src/app/utils/dates';
import { convertBase64 } from 'src/app/utils/images';
import { listRequirement, splitRequirement } from 'src/app/utils/trips';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
})
export class EditTripComponent implements OnInit {
  tripId: string;
  tripForm: FormGroup;
  trip: Trip;
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

    this.trip = new Trip();
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
    const actorId = this.authService.getCurrentActor()?._id;
    this.tripId = this.route.snapshot.params['id'];
    if (this.tripId) {
      this.tripService.getTrip(this.tripId).subscribe((data: any) => {
        this.trip = data as Trip;
        if (this.trip.status != TripStatus.DRAFT) {
          this.router.navigate([`trips/manager/${actorId}`]);
        }
        if (this.trip.manager_id != actorId) {
          this.router.navigate(['denied-access']);
        }
        if (this.trip) {
          this.imagesCollection = this.trip.imageCollection;
          this.tripForm.controls['title'].setValue(this.trip.title);
          this.tripForm.controls['description'].setValue(this.trip.description);
          this.tripForm.controls['startDate'].setValue(this.trip.startDate);
          this.tripForm.controls['endDate'].setValue(this.trip.endDate);
          this.tripForm.controls['requirements'].setValue(
            listRequirement(this.trip.requirements)
          );
        }
      });
    }
  }

  onSubmit(): void {
    const formModel = this.tripForm.value;
    const tripToUpdate = {
      ...formModel,
      _id: this.tripId,
      imageCollection: this.imagesCollection,
    };
    tripToUpdate.requirements = splitRequirement(tripToUpdate.requirements);
    tripToUpdate.startDate = formatDate(
      tripToUpdate.startDate,
      'yyyy-MM-dd',
      'en'
    );
    tripToUpdate.endDate = formatDate(tripToUpdate.endDate, 'yyyy-MM-dd', 'en');

    this.tripService.updateTrip(tripToUpdate).subscribe({
      next: (_) =>
        this.router.navigate([`/trips/manager/${this.trip.manager_id}`]),
      error: (e) => console.error(e),
      complete: () => console.info('PUT Completed'),
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
}
