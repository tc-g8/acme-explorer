import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css'],
})
export class EditCommentComponent implements OnInit {
  @Input() applicationId!: string;
  @Output() editCommentEvent = new EventEmitter<any>();

  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  editComment(form: NgForm) {
    const comment = form.value.comment;
    this.applicationService
      .editComment(comment, this.applicationId)
      .subscribe((res) => {
        this.messageService.notifyMessage(
          $localize`Comment edited`,
          'alert alert-success'
        );
        this.editCommentEvent.emit({
          applicationId: this.applicationId,
          comment: comment,
        });
      });
  }
}
