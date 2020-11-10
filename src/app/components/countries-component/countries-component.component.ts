import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';


@Component({
  selector: 'app-countries-component',
  templateUrl: './countries-component.component.html',
  styleUrls: ['./countries-component.component.css']
})
export class CountriesComponentComponent implements OnInit {

  constructor(private service:DataServiceService) { }
countries:string[]=[]; 
data:string;
totalConfirmed=0;
totalActive=0;
totalDeath=0;
totalRecovered=0;

temp:Map<string,GlobalDataSummary>;
  ngOnInit(): void {

   this.service.getDateWiseData().subscribe(
    result=>{
      // console.log(result);

    }

   )


    this.service.getGlobalData().subscribe(
      
      result=>{
         
       this.temp=result;
        result.forEach((values,keys)=>{
         
          this.countries.push(keys);
          this.totalConfirmed=this.temp.get('Afghanistan').confirmed;
          this.totalActive=this.temp.get('Afghanistan').active;
          this.totalDeath=this.temp.get('Afghanistan').death;
          this.totalRecovered=this.temp.get('Afghanistan').recovered;


        })
      }




     
    )
   // console.log(this.countries);
  }

  updateValues(country:string){
    this.temp.forEach((values,key)=>{
      
      if(country==key){
        this.totalConfirmed+=values.confirmed;
        this.totalRecovered+=values.recovered;
        this.totalActive+=values.active;
        this.totalDeath+=values.death;
      }
      


    })
  }

}
