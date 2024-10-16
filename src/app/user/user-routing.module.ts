import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvailableRoomsComponent } from './available-rooms/available-rooms.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OffersComponent } from './offers/offers.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'available-rooms',
        component: AvailableRoomsComponent
      },
      {
        path: 'aboutus',
        component: AboutusComponent
      },
      {
        path: 'offer',
        component: OffersComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
