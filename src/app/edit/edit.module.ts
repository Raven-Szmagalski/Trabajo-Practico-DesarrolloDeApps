import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { EditPage } from './edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de que ReactiveFormsModule esté aquí
    IonicModule
  ],
  declarations: [EditPage]
})
export class EditPageModule {}
