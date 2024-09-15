import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPage } from './edit.page';
import { AuthGuard } from '../auth/auth.guard';  

const routes: Routes = [
  {
    path: '',
    component: EditPage,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPageRoutingModule {}
