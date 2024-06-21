import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductFormComponent } from './Components/product-form/product-form.component';
import { ProductsCardListComponent } from './Components/products-card-list/products-card-list.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ProductsListComponent', component: ProductListComponent },
  { path: 'Product-Form', component: ProductFormComponent },
  { path: 'products-card-list', component: ProductsCardListComponent }, // Nueva ruta
  { path: 'user-management', component: UserManagementComponent }, // Nueva ruta para UserManagement
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
