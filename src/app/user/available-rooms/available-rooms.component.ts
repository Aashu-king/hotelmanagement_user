import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrl: './available-rooms.component.css'
})
export class AvailableRoomsComponent {
  reservationForm !: FormGroup;
  billForm!: FormGroup;
  billDetailForm!: FormGroup;
  rooms = [
    { roomId: 1, roomNumber: '101' },
    { roomId: 2, roomNumber: '102' }
  ];

  SaveUpdateEvent: boolean = false;
  permissionArray : any 
  pageurl : any;
  dataArray : any
  outlets: any[] = [];
  Guests: any[] = [];
  Rooms: any[] = [];
  
  filteredModuleTypes!: Observable<any[]>;
 
  atLeastAmountToBePaidis : any

OutletTypeOptions: any[] = [];  

 filteredOutlets$: Observable<any[]> = of([]);
 GuestOptions: any[] = [];  
 filteredGuests$: Observable<any[]> = of([]);
RoomOptions: any[] = [];  
filteredRooms$: Observable<any[]> = of([]);


  constructor(private fb: FormBuilder,private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data: any,private router: Router) {}

  ngOnInit(): void {
    this.initForms();
   

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
   



    
    this.billDetailForm.get('amount')?.valueChanges.subscribe((ele) => {
      console.log("🚀 ~ ReservationComponent ~ this.billDetailForm.get ~ ele:", ele)
      if(ele < this.atLeastAmountToBePaidis){
        this.billDetailForm.get('amount')?.setValue(this.atLeastAmountToBePaidis)
        //error message dikhana hai
      }
    })


    this.loadOutlets();
    this.loadGuests();
    this.loadRooms();
    this.setupOutletAutoComplete();
    this.setupGuestAutoComplete();
    this.setupRoomAutoComplete();
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

  private loadOutlets(): void {
    this.http.get('http://localhost:3000/api/v1/dropdown-outlets').subscribe((result: any) => {
      this.outlets  = result;
      console.log("outlet dropdown", this.outlets);
      
      if (this.dataArray) {
        this.setOutlet(this.dataArray.outletid);
      }
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

  onSubmit() {
    if(!this.data){
      console.log("Bill value", this.billForm.value)
      console.log("billdetail value", this.billDetailForm.value)
      console.log("reservation value", this.reservationForm.value)
      console.log("🚀 ~ ReservationComponent ~ onSubmit ~ this.reservationForm.valid:", this.reservationForm.valid)
      console.log("🚀 ~ ReservationComponent ~ onSubmit ~ this.billDetailForm.valid:", this.billDetailForm.valid)
      console.log("🚀 ~ ReservationComponent ~ onSubmit ~ this.billForm.valid:", this.billForm.valid)
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
      }else{
        console.log('yo');
        
      }
    } else {
      if (this.reservationForm.valid) {
        console.log(this.reservationForm.value);
        this.http.put(`http://localhost:3000/api/v1/reservation/${this.data}`, this.reservationForm.value).subscribe(
          (response : any) => {
            console.log('Success!', response);
          }
        );
      }
    }
   
  }
  getDataForTotal(){
    const params = new HttpParams()
    .set('roomId', this.reservationForm.get('roomId')?.value)
    .set('checkInDate', this.reservationForm.get('checkInDate')?.value)
    .set('checkOutDate', this.reservationForm.get('checkOutDate')?.value)
    this.http.get(`http://localhost:3000/api/v1/reservationTotal`,{params}).subscribe((result : any) => {
      const typo = result.data
      console.log("🚀 ~ HotelListComponent ~ this.http.get ~ this:",typo)
      this.reservationForm.get('totalAmount')?.setValue(typo)
      if(typo > 0){
         this.atLeastAmountToBePaidis = (40*typo)/100
        console.log("🚀 ~ ReservationComponent ~ this.http.get ~ atLeastAmountToBePaidis:", this.atLeastAmountToBePaidis)
        this.billDetailForm.get('amount')?.setValue(this.atLeastAmountToBePaidis)
      }
    })
  }

  setOutlet(outletid: number) {
    const selectedOutlet = this.outlets.find(outlet => outlet.outletid === outletid);
    if (selectedOutlet) {
      this.reservationForm.get('OutletName')?.setValue(selectedOutlet.name);
    }
  }

  onDelete(){
    this.http.delete(`http://localhost:3000/api/v1/reservation/${this.data}`).subscribe(
      (response: any) => {
        console.log('Success!', response);
     
      }
    );
  }

}
