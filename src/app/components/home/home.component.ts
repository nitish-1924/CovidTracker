import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import {GlobalDataSummary} from 'src/app/models/global-data'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  globaldata:Map<string,GlobalDataSummary>
  datatable=[]
  chart={
  PieChart:"PieChart",
  ColumnChart:"ColumnChart",
  height:500,
  options:{
    animation:{
      duration:1000,
      easing:'out'
    }
  }

  }
 
  temp:GlobalDataSummary
  constructor(private dataService:DataServiceService) { }
 
  initChart(casetype:string){
    
    this.datatable=[]
   // this.datatable.push(["Country","Cases"])
   
    this.globaldata.forEach((values,keys)=>{
      let value:number;
      if(casetype=='a')
      if(values.active>2000)
      {
        value=values.active
      }
      if(casetype=='c')
      if(values.confirmed>2000)
      {
       // console.log("confirmed")
        value=values.confirmed
      }
      if(casetype=='r')
      // if(values.recovered>2000)
      // {
       // console.log("recovered")
        value=values.recovered
      // }
      if(casetype=='d')
      if(values.death>2000)
      {
        value=values.death
      }

      //console.log(value)
     this.datatable.push([values.country,value])
    })

  
    
      
    
  }

  ngOnInit(): void {

    this.dataService.getGlobalData().subscribe(
      {
        next:(result)=>{
        
          this.globaldata=result
        
         result.forEach((values,keys)=>{
         
          this.temp=values;
          if(!Number.isNaN(this.temp.active)){
          this.totalActive+=this.temp.active
          this.totalDeath+=this.temp.death
          this.totalRecovered+=this.temp.recovered
          this.totalConfirmed+=this.temp.confirmed   
          }
         })
          this.initChart('a');
      


        }
      }
    )

    
  }

  updateChart(casetype:string){
   console.log(casetype)
   this.initChart(casetype);

  }

}
