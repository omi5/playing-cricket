import { Innings } from "./innings";

export interface Match {
    time: string;
    id: string;
    firstInnings: Innings;
    secondInnings: Innings;
    winner: string;
    margin: number;
    isTheMatchTied:boolean;
}