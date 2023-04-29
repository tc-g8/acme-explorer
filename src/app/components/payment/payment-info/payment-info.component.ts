import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css'],
})
export class PaymentInfoComponent implements OnInit {
  @Input() tripId!: string;
  trip: Trip;

  constructor(private tripService: TripService) {
    this.trip = new Trip();
  }

  ngOnInit(): void {
    this.tripService.getTrip(this.tripId).subscribe((trip) => {
      this.trip = trip;
    });
  }
}
