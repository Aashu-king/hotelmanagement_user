import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GuestComponent } from '../../user/guest/guest.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  reservationForm !: FormGroup;
  isGuestFormSaved = false;
  
  constructor(private fb : FormBuilder,private http : HttpClient, private router: Router,public dialog: MatDialog){}
    ngOnInit(): void {
      this.reservationForm = this.fb.group({
        guestName: ['', Validators.required],  // Example form fields, add your fields
        roomNumber: ['', Validators.required],
        checkInDate: ['', Validators.required],
        checkOutDate: ['', Validators.required],
        // Add more form controls as needed
      });
      this.getDataForRoom()
    }

    getDataForRoom(){
      this.http.get('http://localhost:3000/api/v1/userrooms').subscribe((response : any) => {
        console.log("🚀 ~ DashboardComponent ~ this.http.get ~ response:", response)
        
      })
    }

    
  onSubmit() {
    if (this.isGuestFormSaved) {
      // If guest form is already saved, directly save the reservation form
      this.saveReservation();
    } else {
      // If guest form is not saved, open guest form dialog
      this.openGuestForm();
    }
  }
    
  saveReservation() {
    console.log('Reservation form submitted successfully:', this.reservationForm.value);
    // Add logic to save the reservation or navigate to a new page
    this.router.navigate(['/user/reservation']);
  }

  openGuestForm(): void {
    const dialogRef = this.dialog.open(GuestComponent, {
      height: '80%',
      width: '80%',
      panelClass: 'custom-dialog-container',
      position: { left: '280px', top: '60px' }
    });

    // When the dialog closes, check if the guest form was filled
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the guest form is successfully filled, set the flag to true
        this.isGuestFormSaved = true;
        console.log('Guest form saved:', result);
        this.saveReservation();
      }
    });
  }
}
