import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from '@Smarts/home/home.component';
import { ContainerComponent } from '@Smarts/container/container.component';
import { HeaderComponent } from '@Dummies/header/header.component';
import { FooterComponent } from '@Dummies/footer/footer.component';
import { ProductCardComponent } from '@Dummies/product-card/product-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
