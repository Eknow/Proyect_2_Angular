import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Products';
import { ProductsService } from '../../servicios/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ConfirmacionComponent } from '../Modal/confirmacion/confirmacion.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList!: MatTableDataSource<Product>;

  columnsHeader = ['date', 'name', 'price', 'amount', 'status', 'opciones'];

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productListMethod();
  }

  productListMethod(): void {
    try {
      this.productService.getProducst().subscribe((items: Product[]) => {
        this.productList = new MatTableDataSource(items);
      });
    } catch (error) {
      console.log(error);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog is closed');
      if (result) {
        this.productListMethod();
      }
    });
  }

  editDialog(element: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog is closed');
      if (result) {
        this.productListMethod();
      }
    });
  }

  ElimDialog(element: Product): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Elemento eliminado', element);
      } else {
        console.log('Acción cancelada');
      }
    });
  }
}
