import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-profile-password-edit',
  templateUrl: './profile-password-edit.component.html',
  styleUrls: ['./profile-password-edit.component.css'],
})
export class ProfilePasswordEditComponent implements OnInit {
  id: string;

  constructor(
    private router: Router,
    private actorService: ActorService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.id = this.authService.getCurrentActor()?._id!;
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const password = form.value.password;
    this.actorService.updatePassword(this.id, password).subscribe((res) => {
      form.reset();
      this.messageService.notifyMessage(
        $localize`Password updated`,
        'alert alert-success'
      );
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
