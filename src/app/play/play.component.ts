import { Component } from '@angular/core';
import { Country } from '../modal/country';
import { Innings } from '../modal/innings';
import { MatchService } from '../services/match.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {
  selectedCountries: Country[]=[]
  whoWillBallFirst: string = '';
  whoWillBowlSecond: string = '';

  constructor(private route: ActivatedRoute,private matchService: MatchService){
    const ballfirst = localStorage.getItem('bowlFirst');
    if(ballfirst){
      this.whoWillBallFirst = JSON.parse(ballfirst);
    }

    const data = localStorage.getItem('selectedCountries');
    if(data){
      this.selectedCountries = JSON.parse(data);
      this.selectedCountries.forEach((country) => {
        if (country.name !== this.whoWillBallFirst) {
          this.whoWillBowlSecond = country.name; 
        }
      });
    }
    
    this.time = new Date().toLocaleTimeString();

    // const selectedCountries = localStorage.getItem('selectedCountries');
    // const whoWillBallFirst = localStorage.getItem('bowlFirst');
    // if (whoWillBallFirst) {
    //   this.whoWillBallFirst = JSON.parse('whoWillBallFirst');
    // }
    // if (selectedCountries) {
    //   this.selectedCountries = JSON.parse(selectedCountries);
    //   this.selectedCountries.forEach((country) => {
    //     if (country.name !== this.whoWillBallFirst) {
    //       this.whoWillBowlSecond = country.name;
    //     }
    //   });
    // }
    // this.time = new Date().toLocaleTimeString();
  }

  over: number[] = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6];
  time: string = '';
  firstInnings: Innings = {
    team: '',
    over: this.over,
    runs: [],
    totalRuns: 0,
  };
  secondInnings: Innings = {
    team: '',
    over: this.over,
    runs: [],
    totalRuns: 0,
  };

  isTheMatchTied: boolean = false;
  winner: string = '';
  margin: number = 0;
  get firstInningsStatus() {
    return this.firstInnings.team === '';
  }
  get secondInningsStatus() {
    return this.secondInnings.team === '';
  }
  id: string = '';

  // constructor(
  //   private matchService: MatchService,
  //   private route: ActivatedRoute
  // ) {
  //   const selectedCountries = localStorage.getItem('selectedCountries');
  //   const whoWillBowlFirst = localStorage.getItem('bowlFirst');
  //   if (whoWillBowlFirst) {
  //     this.whoWillBallFirst = JSON.parse('bowlFirst');
  //   }
  //   if (selectedCountries) {
  //     this.selectedCountries = JSON.parse(selectedCountries);
  //     this.selectedCountries.forEach((country) => {
  //       if (country.name !== this.whoWillBallFirst) {
  //         this.whoWillBowlSecond = country.name;
  //       }
  //     });
  //   }
  //   this.time = new Date().toLocaleTimeString();
  // }

  generateRuns() {
    const runs = [];
    const possibleRuns = [1, 2, 3, 4, 6];
    for (let index = 0; index < 12; index++) {
      const possibleRunIndex = Math.floor(Math.random() * 5);
      runs.push(possibleRuns[possibleRunIndex]);
    }
    const totalRuns = runs.reduce((acc, run) => (acc += run));
    return { runs, totalRuns };
  }

  onStartFirstInnings() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.firstInnings.over = this.over;
    this.firstInnings.team = this.whoWillBowlSecond;
    this.firstInnings.runs = this.generateRuns().runs;
    this.firstInnings.totalRuns = this.generateRuns().totalRuns;
  }
  onStartSecondInnings() {
    this.secondInnings.over = this.over;
    this.secondInnings.team = this.whoWillBallFirst;
    this.secondInnings.runs = this.generateRuns().runs;
    this.secondInnings.totalRuns = this.generateRuns().totalRuns;
    this.isTheMatchTied =
      this.firstInnings.totalRuns === this.secondInnings.totalRuns;

    if (!this.isTheMatchTied) {
      this.winner =
        this.firstInnings.totalRuns > this.secondInnings.totalRuns
          ? this.firstInnings.team
          : this.secondInnings.team;
      this.margin = Math.abs(
        this.firstInnings.totalRuns - this.secondInnings.totalRuns
      );
    }

    this.matchService
      .storeTheMatch(
        this.id,
        this.time,
        this.firstInnings,
        this.secondInnings,
        this.winner,
        this.margin,
        this.isTheMatchTied
      )
      .subscribe((data) => console.log(data));
  }

}
