import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../servicios/user.service';
import { User } from '../../Users/auth.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  userList = new MatTableDataSource<User>([]);
  columnsHeader: string[] = [
    'username',
    'name',
    'email',
    'phone',
    'role',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => (this.userList.data = data),
      (error) =>
        this.snackBar.open('Error loading users', 'Close', { duration: 3000 })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadUsers();
    });
  }

  editDialog(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadUsers();
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id!).subscribe(
      () => this.loadUsers(),
      (error) =>
        this.snackBar.open('Error deleting user', 'Close', { duration: 3000 })
    );
  }
}
