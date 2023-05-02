import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-list-sponsorships',
  templateUrl: './list-sponsorships.component.html',
  styleUrls: ['./list-sponsorships.component.css'],
})
export class ListSponsorshipsComponent implements OnInit {
  sponsorships: Sponsorship[];
  id: string;
  protected currentActor: Actor | undefined;

  constructor(private tripService: TripService, private route: ActivatedRoute) {
    this.sponsorships = [];
    this.id = '0';
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tripService
      .getSponsorshipsBySponsorId(this.id)
      .subscribe((data: any) => (this.sponsorships = data));
  }
}
