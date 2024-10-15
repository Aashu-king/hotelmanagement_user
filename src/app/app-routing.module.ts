import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { BlankComponent } from './layout/blank/blank.component';

const routes: Routes = [
  
  {path: '' , redirectTo: 'user', pathMatch:'full'},
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'user', 
        loadChildren: () => import('./user/user.module').then(x => x.UserModule)
      }
    ]
  },
  {
  path : 'auth',
  component : BlankComponent,
  children : [
    {
      path : '',
      loadChildren : () => import('./authentication/authentication.module').then(x => x.AuthenticationModule)
    },  
]
 },
 {
  path: '**',
  redirectTo: 'modules/login',
  pathMatch: 'full',
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
