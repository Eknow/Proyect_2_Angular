import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { LoginComponent } from './components/login/login/login.component';
import { SalesWindowComponent } from './components/sales/sales-window/sales-window.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ProductsListComponent', component: ProductsListComponent },
  { path: 'UserListComponent', component: UserListComponent },
  { path: 'SalesWindowComponent', component: SalesWindowComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
