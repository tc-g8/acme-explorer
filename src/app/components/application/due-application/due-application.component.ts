import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationStatus } from 'src/app/enums/application.enum';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-due-application',
  templateUrl: './due-application.component.html',
  styleUrls: ['./due-application.component.css']
})
export class DueApplicationComponent implements OnInit {

  @Input() applicationId!: string;
  @Output() applicationDueEvent = new EventEmitter<string>();

  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  dueApplication() {
    this.applicationService.updateApplicationStatus(this.applicationId, ApplicationStatus.DUE)
    .subscribe((res) => {
      this.messageService.notifyMessage(
        $localize`Application due`,
        'alert alert-success'
      );
      this.applicationDueEvent.emit(this.applicationId);
    });
  }
}
