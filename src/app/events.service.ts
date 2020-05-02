import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User, Rank } from '../models/user';

export interface ResetEventResponse {
  username: string;
  rank: Rank;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  rank_gain = this.socket.fromEvent<ResetEventResponse>("RESET");

  constructor(private socket: Socket) { }

  send_press_event(username: string) {
    this.socket.emit("PRESSED", username);
  }
}
