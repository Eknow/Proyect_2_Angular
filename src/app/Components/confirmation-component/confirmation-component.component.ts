import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsListComponent } from '../products/products-list/products-list.component';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-confirmation-component',
  templateUrl: './confirmation-component.component.html',
  styleUrl: './confirmation-component.component.scss'
})
export class ConfirmationComponentComponent {

  constructor(
    public dialogRef:MatDialogRef<ProductsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  onSave() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
