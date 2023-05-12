import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actor } from '../models/actor.model';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientTestingModule,
      ],
      providers: [AngularFireAuth],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
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

    spyOn(service, 'registerUser').and.returnValue(Promise.resolve(actor));

    const res = await service.registerUser(actor);

    expect(service.registerUser).toHaveBeenCalledWith(actor);
    expect(res.email).toBe(actor.email);
    
  });

  it('should not register a user', async () => {
    let actor = {
      name: 'Pedro',
      surname: 'Garcia',
      email: 'ea',
      password: 'aeiou',
    } as Actor;

    spyOn(service, 'registerUser').and.callFake(() => {
      throw { status: 422 };
    });
  
    try {
      await service.registerUser(actor);
    } catch (error: any) {
      expect(error.status).toBe(422);
    }
  });

  it('should login correctly', async () => {
    let random = Math.floor(Math.random() * 1000000000);
    let today = new Date().getFullYear() * random;
    let actor = {
      name: 'test_' + today.toString(),
      surname: 'test_' + today.toString(),
      email: today.toString() + '@gmail.com',
      password: 'Test_123456',
    } as Actor;

    spyOn(service, 'login').and.returnValue(Promise.resolve(actor));
    
    const res = await service.login(actor.email, actor.password);
    expect(res.email).toBe(actor.email);

  });

  it('should not login correctly', async () => {
    spyOn(service, 'login').and.throwError('Invalid credentials');

    try {
      await service.login('test@test.com', '123abc');
    } catch (error: any) {
      expect(error).toBeTruthy();
    }
  });
});
