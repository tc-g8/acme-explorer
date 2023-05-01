import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationStatus } from 'src/app/enums/application.enum';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.css']
})
export class CancellationComponent implements OnInit {

  @Input() applicationId!: string;
  @Input() tripId!: string;
  @Output() applicationCancelledEvent = new EventEmitter<string>();
  @Output() tripCancelledEvent = new EventEmitter<string>();

  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService,
    private tripService: TripService
  ) { }

  ngOnInit(): void {
  }

  cancelApplication() {
    this.applicationService.updateApplicationStatus(this.applicationId, ApplicationStatus.CANCELLED)
      .subscribe((res) => {
        this.applicationCancelledEvent.emit(this.applicationId);
        this.messageService.notifyMessage(
          $localize`Application cancelled`,
          'alert alert-success'
        );
      });
  }

  cancelationTrip(form: NgForm) {
    const cancelationReason = form.value.reason;
    this.tripService.cancelTrip(this.tripId, cancelationReason)
      .subscribe((res) => {
        this.tripCancelledEvent.emit(cancelationReason);
        this.messageService.notifyMessage(
          $localize`Trip cancelled`,
          'alert alert-success'
        );
      });
  }
}
