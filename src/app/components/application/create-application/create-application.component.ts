import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Actor } from 'src/app/models/actor.model';
import { Trip } from 'src/app/models/trip.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  @Input() tripId!: string;
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';
  @Output() applicationCreatedEvent = new EventEmitter<boolean>();

  constructor(
    private messageService: MessageService,
    private applicationService: ApplicationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
  }

  addApplication(form: NgForm) {
    const comment = form.value.comment;
    this.applicationService.createApplication(comment, this.currentActor!._id, this.tripId).subscribe((res) => {
      form.reset();
      this.messageService.notifyMessage(
        $localize`Application sent`,
        'alert alert-success'
      );
      this.applicationCreatedEvent.emit(true);
    });
  }
}
