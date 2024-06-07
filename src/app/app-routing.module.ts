import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductFormComponent } from './Components/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ProductsListComponent', component: ProductListComponent },
  { path: 'Product-Form', component: ProductFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
