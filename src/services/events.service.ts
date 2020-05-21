import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import { SocketEvents } from '../types/events';
import { Rank } from 'src/types/rank';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  resetListener = this.socket.fromEvent<{ username: string, rank: Rank }>(SocketEvents.RESET);
  updateColorListener = this.socket.fromEvent<{ color: Rank, index: number }>(SocketEvents.UPDATE_COLOR);
  deathListener = this.socket.fromEvent<{}>(SocketEvents.DEATH);

  constructor(private socket: Socket) { }

  sendPressEvent(displayname?: string) {
    this.socket.emit(SocketEvents.PRESSED, displayname);
  }
}
