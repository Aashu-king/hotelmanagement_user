import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component';
import { RoomReservationComponent } from './room-reservation/room-reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATEPICKER_SCROLL_STRATEGY, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { Overlay } from '@angular/cdk/overlay';
import { AvailableRoomsComponent } from './available-rooms/available-rooms.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OffersComponent } from './offers/offers.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { GuestComponent } from './guest/guest.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DashboardComponent,
    CustomCarouselComponent,
    RoomReservationComponent,
    AvailableRoomsComponent,
    AboutusComponent,
    OffersComponent,
    MenuComponent,
    ContactComponent,
    GuestComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,ReactiveFormsModule,MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MAT_DATEPICKER_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.noop(),
      deps: [Overlay]
    }
  ]
})
export class UserModule { }
