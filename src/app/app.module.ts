import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgbTooltipModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { TheButtonComponent } from './the-button/the-button.component';
import { HomeComponent } from './home/home.component';
import { ColorBarComponent } from './color-bar/color-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { colorReducer } from 'src/state/color/color.reducer';
import { userReducer } from 'src/state/user/user.reducer';
import { AuthService } from 'src/services/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { FeedComponent } from './feed/feed.component';
import { InstructionsPageComponent } from './instructions-page/instructions-page.component';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} }

@NgModule({
  declarations: [
    AppComponent,
    TheButtonComponent,
    HomeComponent,
    ColorBarComponent,
    CallbackComponent,
    SettingsFormComponent,
    FeedComponent,
    InstructionsPageComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    StoreModule.forRoot({ 
      color: colorReducer,
      user: userReducer 
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbTooltipModule,
    NgbDropdownModule
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
