import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


@NgModule({
  declarations: [
    DashboardComponent,
    CustomCarouselComponent,
    RoomReservationComponent,
    AvailableRoomsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,ReactiveFormsModule,MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule
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
