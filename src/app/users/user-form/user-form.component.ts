import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    // console.log("dataaa:", this.data);
    this.formGroup = this.fb.group({
      id: [this.data ? this.data._id : null],
      username: [this.data ? this.data.username : '', Validators.required],
      name: [this.data ? this.data.name : '', Validators.required],
      lastName: [this.data ? this.data.lastName : ''],
      email: [
        this.data ? this.data.email : '',
        [Validators.required, Validators.email]
      ],
      phone: [
        this.data ? this.data.phone : '',
        [Validators.required, Validators.pattern(/^\d+$/)]
      ],
      password: [
        this.data ? this.data.password : '',
        [Validators.required, Validators.minLength(6)]
      ],
      status: [this.data ? this.data.status : false, Validators.required],
      role: [this.data ? this.data.role : '', Validators.required]
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
    if (this.formGroup.valid) {
      const request = {
        id: this.data ? this.data._id : null,
        username: this.formGroup.value.username,
        name: this.formGroup.value.name,
        lastName: this.formGroup.value.lastName,
        email: this.formGroup.value.email,
        phone: this.formGroup.value.phone,
        password: this.formGroup.value.password,
        status: this.formGroup.value.status,
        role: this.formGroup.value.role,
        creationDate: this.data ? this.data.creationDate : new Date(),
        deleteDate: this.data ? this.data.deleteDate : undefined,
        idClient: this.data ? this.data.idClient : undefined
      };

      if (!this.data) {
        this.userService.createUser(request).subscribe(item => console.log('Usuario creado:', item));
      } else {
        this.userService.updateUser(request).subscribe(item => console.log('Usuario actualizado:', item));
      }
      this.dialogRef.close(true);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
