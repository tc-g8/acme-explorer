import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorshipStatus } from 'src/app/enums/sponsorship.enum';
import { Image } from 'src/app/models/image.model';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-edit-sponsorship',
  templateUrl: './edit-sponsorship.component.html',
  styleUrls: ['./edit-sponsorship.component.css'],
})
export class EditSponsorshipComponent implements OnInit {
  sponsorshipId: string;
  sponsorship: Sponsorship;
  banner: Image;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sponsorshipId = '';
    this.sponsorship = new Sponsorship();
    this.banner = new Image();
  }

  ngOnInit(): void {
    const actorId = this.authService.getCurrentActor()?._id;
    this.sponsorshipId = this.route.snapshot.params['id'];

    if (this.sponsorshipId) {
      this.tripService
        .getTripSponsorshipById(this.sponsorshipId)
        .subscribe((data: any) => {
          this.sponsorship = data as Sponsorship;
          if (this.sponsorship.status != SponsorshipStatus.PENDING) {
            this.router.navigate([`sponsorships/${this.sponsorshipId}`]);
          }
          if (this.sponsorship.sponsor_id != actorId) {
            this.router.navigate(['denied-access']);
          }
        });
    }
  }

  editSponsorship(form: NgForm) {
    const landingPage = form.value.landingPage;
    const sponsorship = {
      banner: this.banner,
      landingPage: landingPage,
    };
    const sponsorshipId = this.route.snapshot.params['id'];
    const tripId = this.route.snapshot.queryParams['tripId'];

    this.tripService
      .updateSponsorship(tripId, sponsorshipId, sponsorship)
      .subscribe({
        next: (_) =>
          this.router.navigate([
            `/sponsorships/${this.authService.getCurrentActor()!._id}`,
          ]),
        error: (e) => console.error(e),
        complete: () => console.info('POST Completed'),
      });
    form.resetForm();
  }

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
