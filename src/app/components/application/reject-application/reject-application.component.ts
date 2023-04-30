import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-reject-application',
  templateUrl: './reject-application.component.html',
  styleUrls: ['./reject-application.component.css']
})
export class RejectApplicationComponent implements OnInit {

  @Input() applicationId!: string;
  @Output() applicationRejectedEvent = new EventEmitter<any>();

  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  rejectApplication(form: NgForm) {
    console.log(form.value);
    const rejectedReason = form.value.reason;
    this.applicationService.rejectApplication(this.applicationId, rejectedReason)
      .subscribe((res) => {
        this.messageService.notifyMessage(
          $localize`Application rejected`,
          'alert alert-success'
        );
        this.applicationRejectedEvent.emit({"applicationId": this.applicationId, "rejectedReason": rejectedReason});
      });
  }

}
