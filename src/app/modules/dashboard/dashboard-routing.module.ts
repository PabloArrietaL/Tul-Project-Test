import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@Core/guards/auth.guard';
import { CheckoutComponent } from '@Smarts/checkout/checkout.component';
import { ContainerComponent } from '@Smarts/container/container.component';
import { HomeComponent } from '@Smarts/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'category',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'product',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../product/product.module').then((m) => m.ProductModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
