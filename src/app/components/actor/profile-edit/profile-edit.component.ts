import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  actor: Actor;
  @Output() actorUpdatedEvent = new EventEmitter<Actor>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actorService: ActorService,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      _id: [''],
      role: [''],
      name: [''],
      surname: [''],
      phone: [''],
      address: [''],
    });
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const curActor = this.authService.getCurrentActor();

    if (curActor) {
      const idActor = curActor._id;

      this.actorService.getActor(idActor).subscribe((data) => {
        this.actor = data;
        if (this.actor) {
          this.profileForm.controls['_id'].setValue(this.actor._id);
          this.profileForm.controls['role'].setValue(this.actor.role);
          this.profileForm.controls['name'].setValue(this.actor.name);
          this.profileForm.controls['surname'].setValue(this.actor.surname);
          this.profileForm.controls['phone'].setValue(this.actor.phone);
          this.profileForm.controls['address'].setValue(this.actor.address);
        }
      });
    }
  }

  onSubmit() {
    const formModel = this.profileForm.value;
    this.actorService.updateProfile(formModel).subscribe((res) => {
      this.actorUpdatedEvent.emit({ ...this.actor, ...formModel });
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  get name() {
    return this.profileForm.get('name');
  }
  get surname() {
    return this.profileForm.get('surname');
  }
  get phone() {
    return this.profileForm.get('phone');
  }
  get address() {
    return this.profileForm.get('address');
  }
}
