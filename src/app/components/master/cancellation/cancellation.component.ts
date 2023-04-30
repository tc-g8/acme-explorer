import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplicationStatus } from 'src/app/enums/application.enum';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.css']
})
export class CancellationComponent implements OnInit {

  @Input() applicationId!: string;
  @Output() applicationCancelledEvent = new EventEmitter<string>();

  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    if (this.applicationId) {
      this.applicationService.updateApplicationStatus(this.applicationId, ApplicationStatus.CANCELLED)
        .subscribe((res) => {
          this.applicationCancelledEvent.emit(this.applicationId);
          this.messageService.notifyMessage(
            $localize`Application cancelled`,
            'alert alert-success'
          );
        });
    }
  }

}
