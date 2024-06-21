import { ProductsService } from './../../servicios/products.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../models/Products';
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
      code: [this.data ? this.data.code : '', Validators.required],
      description: [this.data ? this.data.description : ''],
      price: [
        this.data ? this.data.price : null,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      amount: [
        this.data ? this.data.amount : null,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  onSave() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  save(): void {
    let request: any = {
      _id: this.data ? this.data._id : null,
      name: this.formGroup.value.name,
      code: this.formGroup.value.code,
      category: this.formGroup.value.category,
      price: Number(this.formGroup.value.price),
      amount: Number(this.formGroup.value.amount),
      description: this.formGroup.value.description,
    };

    if (!this.data) {
      this.ProductsService.createProduct(request).subscribe((item) =>
        console.log(item)
      );
    } else {
      this.ProductsService.editProduct(request).subscribe((item) =>
        console.log(item)
      );
    }
    this.dialogRef.close(true);
  }
}
