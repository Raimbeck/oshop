import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth, 
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  get AppUser$() {
    return this.user$.switchMap(user => {
      if(!user) return Observable.of(null);
      return this.userService.getUser(user.uid);
    });
  }
}
