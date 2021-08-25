import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [TextInputComponent],
  imports: [CommonModule, CarouselModule.forRoot(), ReactiveFormsModule],
  exports: [CarouselModule, ReactiveFormsModule, TextInputComponent],
})
export class SharedModule {}
