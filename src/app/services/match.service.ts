import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Innings } from '../modal/innings';
import { Match } from '../modal/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  baseURL = 'https://mock-api-playing-cricket-production.up.railway.app/api/matches'
  constructor(private http: HttpClient) {}

  storeTheMatch(id: string, time: string,firstInnings: Innings,secondInnings: Innings, winner: string, margin: number, isTheMatchTied: boolean): Observable<Match> {
    const match = {id, time, firstInnings, secondInnings,winner, margin, isTheMatchTied}
    return this.http.post<Match>(this.baseURL,match)
  }

  getAllMatches(): Observable<Match[]>{
    return this.http.get<Match[]>(this.baseURL)
  }

  findMatchById(id:string): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.baseURL}?id=${id}`)
  }
}
