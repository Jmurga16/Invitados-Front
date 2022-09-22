import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInvitadosComponent } from './modules/form-invitados/form-invitados.component';
import { ListaInvitadosComponent } from './modules/lista-invitados/lista-invitados.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "invitados",
    pathMatch: "full"
  },
  {
    path: "invitados",
    component: ListaInvitadosComponent
  },
  {
    path: "invitados/agregar",
    component: FormInvitadosComponent
  },
  {
    path: "invitados/editar/:dni",
    component: FormInvitadosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
