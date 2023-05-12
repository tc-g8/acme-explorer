import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-publish-trip',
  templateUrl: './publish-trip.component.html',
  styleUrls: ['./publish-trip.component.css']
})
export class PublishTripComponent implements OnInit {

  @Input() tripId!: string;
  @Output() tripPublishEvent = new EventEmitter<string>();

  constructor(
    private messageService: MessageService,
    private tripService: TripService,
  ) { }

  ngOnInit(): void {
  }

  publishThisTrip() {
    console.log('publishThisTrip')
    this.tripService.publishTrip(this.tripId)
    .subscribe((res) => {
      this.messageService.notifyMessage(
        $localize`Trip published`,
        'alert alert-success'
      );
      this.tripPublishEvent.emit(this.tripId);
    });
  }

}
