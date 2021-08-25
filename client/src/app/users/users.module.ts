import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserComponent, RegisterUserComponent, EditUserComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UsersModule {}
