import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketEvents } from '../types/events';
import { Rank } from 'src/types/rank';

export interface FeedItem {
  displayname: string;
  rank: Rank;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  resetListener = this.socket.fromEvent<{ feed: FeedItem[]}>(SocketEvents.RESET);
  updateColorListener = this.socket.fromEvent<{ color: Rank, index: number }>(SocketEvents.UPDATE_COLOR);
  
  // runs when client connects to get current feed
  sendFeedListener = this.socket.fromEvent<{ feed: FeedItem[]}>(SocketEvents.SEND_FEED);
  setUserColorListener = this.socket.fromEvent<{ rank: Rank }>(SocketEvents.SET_USER_COLOR);
  deathListener = this.socket.fromEvent<{}>(SocketEvents.DEATH);

  constructor(private socket: Socket) { }

  sendPressEvent(email?: string) {
    this.socket.emit(SocketEvents.PRESSED, email);
  }
}
