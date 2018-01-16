import { Observable } from 'rxjs/Rx';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private cartService: ShoppingCartService) {
    
  }

  async ngOnInit() {
    this.authService.AppUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.authService.logout();
  }
}
