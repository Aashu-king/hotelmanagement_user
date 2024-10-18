import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private fb : FormBuilder,private http : HttpClient){}
    ngOnInit(): void {
      this.getDataForRoom()
    }

    getDataForRoom(){
      this.http.get('http://localhost:3000/api/v1/userrooms').subscribe((response : any) => {
        console.log("🚀 ~ DashboardComponent ~ this.http.get ~ response:", response)
        
      })
    }
    
}
