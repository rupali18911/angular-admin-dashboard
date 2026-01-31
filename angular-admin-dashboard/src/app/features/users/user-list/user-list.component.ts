import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../../../core/models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { LoaderComponent } from '../../../shared/components/loader/loader';


@Component({
  standalone: true,
  imports: [CommonModule, UserFormComponent,  ConfirmDialogComponent,
    LoaderComponent ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users : any;
  loading : any;
  showModal = signal(false);
  selectedUser?: User;
  showConfirm = signal(false);
  deleteId?: number;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.load();
     this.users = this.userService.users;
     this.loading = this.userService.loading;

  }

  addUser() {
    this.selectedUser = undefined;
    this.showModal.set(true);
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.showModal.set(true);
  }

  save(user: User) {
    user.id
      ? this.userService.update(user).subscribe()
      : this.userService.add(user).subscribe();

    this.showModal.set(false);
  }

  remove(id: number) {
    if (confirm('Delete user?')) {
      this.userService.delete(id).subscribe();
    }
  }

  askDelete(id: number) {
    this.deleteId = id;
    this.showConfirm.set(true);
  }

  confirmDelete() {
    this.userService.delete(this.deleteId!).subscribe();
    this.showConfirm.set(false);
  }
}
