import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Subscription } from 'rxjs';
import { Rank, RankColorMap } from 'src/types/rank';
import { AuthService } from 'src/services/auth.service';
import { Store, select } from '@ngrx/store';
import { User } from 'src/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User;
  _userSub: Subscription;
  rankColorMap = RankColorMap;

  isDead: boolean = false;
  _deathListener: Subscription;
  gifLink: string = "https://media.giphy.com/media/3o7aCTNjq3qiUbzrHi/giphy.gif"

  constructor(
    private eventsService: EventsService,
    public authService: AuthService,
    private store: Store<{ user: User }>
  ) { }

  ngOnInit() {
    this._userSub = this.store.pipe(select('user')).subscribe(user => {
      this.user = user;
    });

    this._deathListener = this.eventsService.deathListener.subscribe(() => {
      this.isDead = true;
      console.log("The Button is dead! Long live The Button!");
    });
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
    this._deathListener.unsubscribe();
  }

  get rankColor() { return this.authService.isLoggedIn ? this.rankColorMap[this.user.rank] : null }
  get userInfo() { return this.authService.isLoggedIn ? this.user.displayname : 'Sign in' }

  login() {
    !this.authService.isLoggedIn ? this.authService.login() : null;
  }

  logout() {
    this.authService.isLoggedIn ? this.authService.logout() : null;
  }

}
