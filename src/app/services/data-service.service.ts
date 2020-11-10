import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  
  public temp;
  private url="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/";
  private GlobaldataUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/11-06-2020.csv";
  //private GlobaldataUrl
  private DatewisedataUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  constructor(private http:HttpClient) {
  
    let date=new Date();
   let yesterday=new Date(date);
  //  let d=this.date.getDate()-1;
  //  let m=this.date.getMonth()+1

  yesterday.setDate(yesterday.getDate() - 1)
  //console.log(yesterday.getDate())
   
   let a=yesterday.getDate();
   let m=yesterday.getMonth()+1;

   

   var n=a.toString();
   if(n.length<2){
     n="0"+n;
   }

  
    this.temp=m+"-"+n+"-"+yesterday.getFullYear()+".csv"
    
    this.url+=this.temp
    this.GlobaldataUrl=this.url
    console.log(this.GlobaldataUrl)

   }
  
  getDateWiseData()
  {
  
   return this.http.get(this.DatewisedataUrl,{responseType:'text'}).pipe(
  map(result=>{

   let rows=result.split('\n');
   console.log(rows);
   let header=rows[0]
   let dates=header.split(/,(?=\S)/)
   console.log(dates)
   dates.splice(0,4)
   rows.splice(0,1)

   return result;

  })
    


   )
  }

   getGlobalData() 
   {
   return this.http.get(this.GlobaldataUrl,{responseType:'text'}).pipe(
     map(result=>{
      let data:GlobalDataSummary[]=[];
      
      var map=new Map();

      //console.log(this.date)

      let rows=result.split('\n')
     rows.splice(0,1) 
     rows.forEach(row => {
     
     let cols=row.split(/,(?=\S)/)

     if(map.has(cols[3])){

      let cnfrm=parseInt(cols[7])+map.get(cols[3]).confirmed
      let deth=parseInt(cols[8])+map.get(cols[3]).death
      let reco=parseInt(cols[9])+map.get(cols[3]).recovered
      let acti=parseInt(cols[10])+map.get(cols[3]).active
      
       map.set(cols[3],{
        country:cols[3],
        confirmed:cnfrm,
        death:deth,
        recovered:reco,
        active:acti


       })
     

     } 
     else{
       
      map.set(cols[3],{
         country:cols[3],
         confirmed:+cols[7],
         death:+cols[8],
         recovered:+cols[9],
         active:+cols[10]
      })

     } 

    
      
       
     });
     
     return map;
     }))
   
   }


}
