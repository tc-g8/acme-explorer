import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SponsorshipStatus } from 'src/app/enums/sponsorship.enum';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-display-sponsorship',
  templateUrl: './display-sponsorship.component.html',
  styleUrls: ['./display-sponsorship.component.css'],
})
export class DisplaySponsorshipComponent implements OnInit {
  sponsorship: Sponsorship;
  id: string;

  constructor(private tripService: TripService, private route: ActivatedRoute) {
    this.id = '0';
    this.sponsorship = new Sponsorship();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tripService
      .getTripSponsorshipById(this.id)
      .subscribe((sponsorship) => {
        this.sponsorship = sponsorship;
      });
  }

  handleCanceledSponsorship() {
    this.sponsorship.status = SponsorshipStatus.CANCELLED;
  }
}
