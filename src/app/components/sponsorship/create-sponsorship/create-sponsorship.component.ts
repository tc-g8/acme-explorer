import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Image } from 'src/app/models/image.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-sponsorship',
  templateUrl: './create-sponsorship.component.html',
  styleUrls: ['./create-sponsorship.component.css'],
})
export class CreateSponsorshipComponent implements OnInit {
  banner: Image;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.banner = new Image();
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertBase64(file).then((encodedImage) => {
        const image = encodedImage as string;
        const alt = file.name;
        this.banner = { image, alt } as Image;
      });
    }
  }

  removeImage() {
    this.banner = new Image();
  }

  onAddSponsorship(form: NgForm) {
    const landingPage = form.value.landingPage;
    const sponsorship = {
      banner: this.banner,
      landingPage: landingPage,
      sponsor_id: this.authService.getCurrentActor()!._id,
    };
    const tripId = this.route.snapshot.queryParams['tripId'];

    this.tripService.createSponsorship(sponsorship, tripId).subscribe({
      next: (_) =>
        this.router.navigate([
          `/sponsorships/sponsor/${this.authService.getCurrentActor()!._id}`,
        ]),
      error: (e) => console.error(e),
      complete: () => console.info('POST Completed'),
    });
    form.resetForm();
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
}
