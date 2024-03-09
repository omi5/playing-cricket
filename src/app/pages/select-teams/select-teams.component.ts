import { Component } from '@angular/core';
import { Country} from '../../modal/country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-teams',
  templateUrl: './select-teams.component.html',
  styleUrl: './select-teams.component.css'
})
export class SelectTeamsComponent {

  constructor(private router:Router){}

  countries: Country[] = [
    { flag: 'assets/Afg.png', name: 'Afghanistan', abbreviation: 'AFG' },
    { flag: 'assets/Aus.png', name: 'Australia', abbreviation: 'AUS' },
    { flag: 'assets/Ban.png', name: 'Bangladesh', abbreviation: 'BAN' },
    { flag: 'assets/Eng.png', name: 'England', abbreviation: 'ENG' },
    { flag: 'assets/Ind.png', name: 'India', abbreviation: 'IND' },
    { flag: 'assets/NZ.png', name: 'New Zealand', abbreviation: 'NZ' },
    { flag: 'assets/Pak.png', name: 'Pakistan', abbreviation: 'PAK' },
    { flag: 'assets/RSA.png', name: 'South Africa', abbreviation: 'RSA' },
    { flag: 'assets/SL.png', name: 'Sri Lanka', abbreviation: 'SL' },
    { flag: 'assets/WI.png', name: 'West Indies', abbreviation: 'WI' },
  ];

  selectedCountries: Country[]=[]
  get isSelected(): boolean {
    return this.selectedCountries.length < 2;
  }

  onSelect(abbreviation:string){
    const selectCountryName = this.countries.find(
    (country)=> country.abbreviation === abbreviation
    );

    if(selectCountryName && !this.selectedCountries.includes(selectCountryName)){
      if(this.selectedCountries.length > 1){
        this.selectedCountries.shift()
      }
      else{
        this.selectedCountries.push(selectCountryName)
      }
    }
    else{
      console.error('Country not found!', abbreviation);
    }
    console.log('countrySelected',this.selectedCountries);
    
  }

  onPlay(){
    console.log('click');
    
    localStorage.setItem('selectedCountries', JSON.stringify(this.selectedCountries));
    this.router.navigate(['/toss'])
  }
}
