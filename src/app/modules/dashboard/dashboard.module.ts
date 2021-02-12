import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from '@Smarts/home/home.component';
import { ContainerComponent } from '@Smarts/container/container.component';
import { HeaderComponent } from '@Dummies/header/header.component';
import { FooterComponent } from '@Dummies/footer/footer.component';
import { ProductCardComponent } from '@Dummies/product-card/product-card.component';
import { CheckoutComponent } from '@Smarts/checkout/checkout.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CheckoutComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
