import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationDetailsComponent } from './registration-details/registration-details.component';

const routes: Routes = [
  {
    path: '' , redirectTo: '' , pathMatch: 'full'
   },
  {
    path: '',
    children : [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegistrationComponent
      },
      {
        path: 'registerdetails', component: RegistrationDetailsComponent
      }
    ]
      
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
