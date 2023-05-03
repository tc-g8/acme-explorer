import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ActorIdGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      const currentActor = this.authService.getCurrentActor();
      let result = false;
      const idParam = route.params['id'];
      if (currentActor && idParam) {
        if (idParam == currentActor._id) {
          result = true;
          resolve(result);
        } else {
          this.router.navigate(['denied-access'], {
            queryParams: { previousURL: state.url },
          });
          resolve(result);
        }
      } else {
        this.router.navigate(['denied-access'], {
          queryParams: { previousURL: state.url },
        });
        resolve(result);
      }
    });
  }
}
