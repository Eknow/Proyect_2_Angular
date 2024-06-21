import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../servicios/user.service';
import { User } from '../../Users/auth.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.fb.group({
      id: [data ? data.id : ''],
      username: [data ? data.username : '', Validators.required],
      name: [data ? data.name : '', Validators.required],
      lastName: [data ? data.lastName : ''],
      email: [data ? data.email : '', [Validators.required, Validators.email]],
      phone: [data ? data.phone : ''],
      role: [data ? data.role : '', Validators.required],
      password: ['', Validators.required],
    });
  }

  save(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const user = this.formGroup.value;

    if (this.data) {
      this.userService.updateUser(user).subscribe(
        () => {
          this.snackBar.open('Usuario actualizado', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        (error) =>
          this.snackBar.open('Error actualizando usuario', 'Cerrar', {
            duration: 3000,
          })
      );
    } else {
      this.userService.createUser(user).subscribe(
        () => {
          this.snackBar.open('Usuario creado', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        (error) =>
          this.snackBar.open('Error creando usuario', 'Cerrar', {
            duration: 3000,
          })
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
