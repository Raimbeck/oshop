import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { SharedModule } from './../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShippingSummaryComponent } from './components/shipping-summary/shipping-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [ AuthGuard ] },
      { path: 'check-out', component: CheckOutComponent, canActivate: [ AuthGuard ] },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [ AuthGuard ] },
    ])
  ],
  declarations: [
    ShoppingCartComponent,
    ProductFilterComponent,
    ShippingFormComponent,
    OrderSuccessComponent,
    ShippingSummaryComponent,
    ProductsComponent,
    CheckOutComponent,
    MyOrdersComponent,
  ]
  
})
export class ShoppingModule { }
