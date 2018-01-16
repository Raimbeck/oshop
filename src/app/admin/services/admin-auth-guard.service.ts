import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.AppUser$.map(user => user.isAdmin);
  }

}
