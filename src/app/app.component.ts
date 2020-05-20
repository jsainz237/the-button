import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the-button';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if(this.authService.isLoggedIn) {
      this.authService.getRank(this.authService.userProfile.email)
        .subscribe(({ email, rank }) => console.log(rank))
    }
  }
}
