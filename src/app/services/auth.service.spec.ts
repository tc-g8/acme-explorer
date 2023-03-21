import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule],
      providers: [AngularFireAuth]
    });
    service = TestBed.inject(AuthService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('should register an user'), () => {
    const actor: any = {
      "name": "David",
      "surname": "Perez",
      "email": "davidperez@gmail.com",
      "password": "David_12345",
      "role": ["ADMINISTRATOR"]
      }
    const items = service.registerUser(actor)
    console.log(items)
  }
});
