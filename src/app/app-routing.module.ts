import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {CountriesComponentComponent} from './components/countries-component/countries-component.component'
const routes: Routes = [

  {
    path:'',component:HomeComponent
  },
  {
    path:'countries',component:CountriesComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
