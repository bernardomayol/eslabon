import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createUserForm();
  }

  saveUser() {
    this.userService
      .createUser(this.userForm.get('altaForm')!.value)
      .subscribe(() => {
        this.router.navigateByUrl('users');
      });
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      altaForm: this.formBuilder.group({
        email: [null, Validators.required],
        password: [null, Validators.required],
        displayName: [null, Validators.required],
        genero: [null, Validators.required],
      }),
    });
  }
}
