import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrl: './room-reservation.component.css'
})
export class RoomReservationComponent {
  reservationForm !: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      checkIn: [''],
      checkOut: [''],
      rooms: ['1'],
      guests: ['1']
    });
  }

  onSubmit() {
    console.log(this.reservationForm.value);
  }

  book(){
   this.router.navigate(['/user/available-rooms']);
  }
}
