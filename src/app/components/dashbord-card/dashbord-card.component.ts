import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord-card',
  templateUrl: './dashbord-card.component.html',
  styleUrls: ['./dashbord-card.component.css']
})
export class DashbordCardComponent implements OnInit {
  

@Input('totalConfirmed')
totalConfirmed;
@Input('totalDeath')
totalDeath;
@Input('totalActive')
totalActive;
@Input('totalRecovered')
totalRecovered;



  constructor() { }

  ngOnInit(): void {
  }

}
