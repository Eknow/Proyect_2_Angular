import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../../models/Products';

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
    private fb: FormBuilder
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
        this.data ? this.data.price : '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      amount: [
        this.data ? this.data.amount : '',
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
}
