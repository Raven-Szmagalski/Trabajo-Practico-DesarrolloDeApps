// edit-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPage } from './edit.page';
import { AuthGuard } from '../auth/auth.guard';  // Asegúrate de importar el AuthGuard

const routes: Routes = [
  {
    path: '',
    component: EditPage,
    canActivate: [AuthGuard]  // Aplicar el AuthGuard aquí
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPageRoutingModule {}
