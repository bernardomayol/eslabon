import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  id!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.createUserForm();
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.id).subscribe((response: IUser) => {
      if (response) {
        this.userForm.get('altaForm')!.patchValue(response);
      }
    });
  }

  saveUser() {
    this.userService
      .updateUser(this.id, this.userForm.get('altaForm')!.value)
      .subscribe(
        () => {
          this.router.navigateByUrl('users');
        },
        (error) => {
          console.log(error);
        }
      );
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
