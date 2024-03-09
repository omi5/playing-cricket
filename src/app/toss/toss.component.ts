import { Component } from '@angular/core';
import { Country } from '../modal/country';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-toss',
  templateUrl: './toss.component.html',
  styleUrl: './toss.component.css'
})
export class TossComponent {

  selectedCountries: Country[]= []
  whoWillBowlFirst :string = ''
  id:string = uuidv4();
  constructor(private router:Router){
   const data =  localStorage.getItem('selectedCountries')
   if(data){
    this.selectedCountries = JSON.parse(data)
   }
  }

  onSelect(name: string){
    this.whoWillBowlFirst = name;
    localStorage.setItem('bowlFirst', JSON.stringify(this.whoWillBowlFirst));
    this.router.navigate(['/play',this.id])
  }
}
