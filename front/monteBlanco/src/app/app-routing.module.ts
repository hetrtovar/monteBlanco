import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: PrincipalComponent },
  { path: 'register', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
