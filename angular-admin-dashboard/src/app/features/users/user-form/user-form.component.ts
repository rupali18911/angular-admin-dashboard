import { Component, EventEmitter, Input, Output, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.model';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {

  private fb = inject(FormBuilder);

  @Input() user?: User;
  @Output() save = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();

  form = this.fb.nonNullable.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['User'],
    status: ['Active']
  });

  ngOnChanges() {
    if (this.user) {
      this.form.patchValue(this.user);
    } else {
      this.form.reset({
        id: 0,
        name: '',
        email: '',
        role: 'User',
        status: 'Active'
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.save.emit(this.form.getRawValue());
  }
}
