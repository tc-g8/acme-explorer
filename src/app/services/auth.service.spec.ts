import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actor } from '../models/actor.model';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', async () => {
    let random = Math.floor(Math.random() * 1000000000);
    let today = new Date().getFullYear() * random;
    let actor = {
      name: 'test_' + today.toString(),
      surname: 'test_' + today.toString(),
      email: today.toString() + '@gmail.com',
      password: 'Test_123456',
    } as Actor;

    const res = await service.registerUser(actor);
    expect(res.email).toBe(actor.email);
  })

  it('should not register a user', async () => {
    let actor = {
      name: 'Pedro',
      surname: 'Garcia',
      email: 'ea',
      password: 'aeiou',
    } as Actor;

    try {
      await service.registerUser(actor)
    } catch (error: any) {
      expect(error.status).toBe(422);
    }
  })

  it('should login correctly', async () => {
    let random = Math.floor(Math.random() * 1000000000);
    let today = new Date().getFullYear() * random;
    let actor = {
      name: 'test_' + today.toString(),
      surname: 'test_' + today.toString(),
      email: today.toString() + '@gmail.com',
      password: 'Test_123456',
    } as Actor;

    const registration = await service.registerUser(actor);
    expect(registration.email).toBe(actor.email);

    const res = await service.login(actor.email, actor.password);
    expect(res.email).toBe(actor.email);
  })

  // El test pasa. Pero envía una excepción de FireBase, que a pesar de capturarla, aparece en los resultados como error
  // it('should not login correctly', async () => {
  //   try {
  //     await service.login('test@test.com', 'aeiou')
  //   } catch (error) {
  //     expect(error).toBeTruthy();
  //   }
  // })

});
