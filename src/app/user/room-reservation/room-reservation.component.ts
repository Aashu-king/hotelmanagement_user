import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestComponent } from '../guest/guest.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrl: './room-reservation.component.css'
})
export class RoomReservationComponent {
  reservationForm !: FormGroup;
  billForm!: FormGroup;
  billDetailForm!: FormGroup;
  isGuestFormSaved = false;
  rooms = [
    { roomId: 1, roomNumber: '101' },
    { roomId: 2, roomNumber: '102' }
  ];
  SaveUpdateEvent: boolean = false;
  dataArray : any
  outlets: any[] = [];
  Guests: any[] = [];
  Rooms: any[] = [];
  OutletTypeOptions: any[] = [];  
 filteredOutlets$: Observable<any[]> = of([]);
 GuestOptions: any[] = [];  
 filteredGuests$: Observable<any[]> = of([]);
RoomOptions: any[] = [];  
filteredRooms$: Observable<any[]> = of([]);
atLeastAmountToBePaidis : any
permissionArray : any 
pageurl : any;
  
  constructor(private fb: FormBuilder, private router: Router,public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForms();
    this.loadOutlets();
    this.loadGuests();
    this.loadRooms();
    this.setupOutletAutoComplete();
    this.setupGuestAutoComplete();
    this.setupRoomAutoComplete();

    console.log("🚀 ~ ReservationComponent ~ ngOnInit ~ this.reservationForm.get('roomId')?.value:", this.reservationForm.get('roomId')?.value)
    this.reservationForm.get('checkInDate')?.valueChanges.subscribe((ele : any) =>{
      console.log(ele);
      
      if(this.reservationForm.get('roomId')?.value && this.reservationForm.get('checkInDate')?.value && this.reservationForm.get('checkOutDate')?.value){
        this.getDataForTotal()
      }
    })
    
    this.reservationForm.get('checkOutDate')?.valueChanges.subscribe((ele : any) =>{
      if(this.reservationForm.get('roomId')?.value && this.reservationForm.get('checkInDate')?.value && this.reservationForm.get('checkOutDate')?.value){
        this.getDataForTotal()
      }
    })

    this.reservationForm.get('roomId')?.valueChanges.subscribe((ele : any) =>{
      if(this.reservationForm.get('roomId')?.value && this.reservationForm.get('checkInDate')?.value && this.reservationForm.get('checkOutDate')?.value){
        this.getDataForTotal()
      }
    })

    this.reservationForm.get('guestId')?.valueChanges.subscribe((ele : any) =>{
      console.log(ele);
      
    this.billForm.get('guestId')?.setValue(parseInt(this.reservationForm.get('guestId')?.value))
    console.log("🚀 ~ ReservationComponent ~ this.reservationForm.get ~ this.billDetailForm:", this.billForm.value)
    })
    this.reservationForm.get('outletid')?.valueChanges.subscribe((ele : any) =>{
      this.billForm.get('outletid')?.setValue(parseInt(this.reservationForm.get('outletid')?.value))
      this.billDetailForm.get('outletid')?.setValue(parseInt(this.reservationForm.get('outletid')?.value))

    })

    this.reservationForm.get('totalAmount')?.valueChanges.subscribe((ele : any) =>{
      this.billForm.get('totalAmount')?.setValue(parseInt(this.reservationForm.get('totalAmount')?.value))
    })
   

    this.pageurl =  this.router.url.split('/')[2]
    console.log("🚀 ~ HotelListComponent ~ ngOnInit ~ this.pageurl:", this.pageurl)

    this.http.get('http://localhost:3000/api/v1/getPerm').subscribe((result : any) => {
      this.permissionArray = result.Permissions.find((ele : any) => ele.page.pageUrl == `/${this.pageurl}`)
      console.log("🚀 ~ HotelListComponent ~ this.http.get ~ this:",this.permissionArray)
    })
    
    this.billDetailForm.get('amount')?.valueChanges.subscribe((ele) => {
      console.log("🚀 ~ ReservationComponent ~ this.billDetailForm.get ~ ele:", ele)
      if(ele < this.atLeastAmountToBePaidis){
        this.billDetailForm.get('amount')?.setValue(this.atLeastAmountToBePaidis)
        //error message dikhana hai
      }
    })

    
    
  }

  initForms(): void {
    this.reservationForm = this.fb.group({
      reservationId: [''],
      guestId: ['', Validators.required],
      roomId: ['', Validators.required],
      reservationDate: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      status: ['pending', Validators.required],
      paymentStatus: ['pending', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
      specialRequests: [''],
      outletid: ['', Validators.required],
      OutletName: [''],
      GuestName: ['']
    });

    this.billForm = this.fb.group({
      billId: [''],
      guestId: ['', Validators.required],
      totalAmount: [, [Validators.required, Validators.min(0)]],
      paymentMethod: ['', Validators.required],
      status: ['', Validators.required],
      outletid: ['', Validators.required]
    });

    this.billDetailForm = this.fb.group({
      billDetailId: [''],
      billId: [''],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      amount: ['', [Validators.required, Validators.min(0)]],
      outletid: ['', Validators.required]
    });
  }

  onSubmit() {
      this.saveReservation();
  }

  saveReservation() {
    console.log('Reservation form submitted successfully:', this.reservationForm.value);
    if (this.reservationForm.valid && this.billDetailForm.valid && this.billForm.valid) {
      let theObj = {
        reservationForm : this.reservationForm.value,
        billDetailForm : this.billDetailForm.value,
        billForm : this.billForm.value,
      }
      console.log(this.reservationForm.value);
      this.http.post('http://localhost:3000/api/v1/reservation', theObj).subscribe(
        (response : any) => {
          console.log('Success!', response);
        }
      );
      this.router.navigate(['/user/dashboard']);

    }else{
      console.log('yo');
      
    }

  }

  private loadOutlets(): void {
    this.http.get('http://localhost:3000/api/v1/dropdown-outlets').subscribe((result: any) => {
      this.outlets  = result;
      console.log("outlet dropdown", this.outlets);
   
    });
  }

  private loadGuests(): void {
    this.http.get('http://localhost:3000/api/v1/dropdown-guests').subscribe((result: any) => {
      this.Guests  = result;
      console.log("Guest dropdown+==>:", this.Guests);
    });
  }

  private loadRooms(): void {
    this.http.get('http://localhost:3000/api/v1/dropdown-rooms').subscribe((result: any) => {
      this.Rooms  = result;
      console.log("room dropdown", this.Rooms);
    });
  }

  private setupOutletAutoComplete(): void {
    this.filteredOutlets$ = this.reservationForm.get('OutletName')!.valueChanges.pipe( 
      startWith(''),
      map(value => this.filterOutlets(value || ''))
    );
  }

  private setupGuestAutoComplete(): void {
    this.filteredGuests$ = this.reservationForm.get('GuestName')!.valueChanges.pipe( 
      startWith(''),
      map(value => this.filterGuests(value || ''))
    );
  }

  private setupRoomAutoComplete(): void {
    this.filteredRooms$ = this.reservationForm.get('Room')!.valueChanges.pipe( 
      startWith(''),
      map(value => this.filterRooms(value || ''))
    );
  }

  private filterOutlets(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.outlets.filter((option: any) => 
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private filterGuests(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.Guests.filter(guest => 
      (`${guest.firstName} ${guest.lastName}`).toLowerCase().includes(filterValue)
    );
  }

  private filterRooms(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.Rooms.filter((option: any) => 
      option.roomNumber.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelected(event: any): void {
    const selectedOutlet  = this.outlets.find((type: any) => type.name === event.option.value);
    if (selectedOutlet ) {
      this.reservationForm.get('outletid')?.setValue(selectedOutlet.outletid);
      this.billForm.get('outletid')?.setValue(selectedOutlet.outletid)
      this.billDetailForm.get('outletid')?.setValue(selectedOutlet.outletid)
    }
  }

  onOptionSelectedGuest(event: any): void {
    const selectedGuest = this.Guests.find(guest => `${guest.firstName} ${guest.lastName}` === event.option.value);
    if (selectedGuest) {
      this.reservationForm.get('guestId')?.setValue(selectedGuest.guestId);
      this.billForm.get('guestId')?.setValue(selectedGuest.guestId)
      this.billDetailForm.get('guestId')?.setValue(selectedGuest.guestId)
      
    }
    
  }

  onOptionSelectedRoom(event: any): void {
    const selectedRoom  = this.Rooms.find((type: any) => type.roomNumber === event.option.value);
    if (selectedRoom ) {
      this.reservationForm.get('roomId')?.setValue(selectedRoom.roomId);
    }
  }

  getDataForTotal(){
    const params = new HttpParams()
    .set('roomId', this.reservationForm.get('roomId')?.value)
    .set('checkInDate', this.reservationForm.get('checkInDate')?.value)
    .set('checkOutDate', this.reservationForm.get('checkOutDate')?.value)
    this.http.get(`http://localhost:3000/api/v1/reservationTotal`,{params}).subscribe((result : any) => {
      const typo = result.data
      console.log("🚀 ~ Total amount consol:",typo)
      this.reservationForm.get('totalAmount')?.setValue(typo)
      if(typo > 0){
         this.atLeastAmountToBePaidis = (40*typo)/100
        console.log("🚀 ~ ReservationComponent ~ this.http.get ~ atLeastAmountToBePaidis:", this.atLeastAmountToBePaidis)
        this.billDetailForm.get('amount')?.setValue(this.atLeastAmountToBePaidis)
      }
    })
  }


}
