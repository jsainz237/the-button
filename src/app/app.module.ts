import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { TheButtonComponent } from './the-button/the-button.component';
import { HomeComponent } from './home/home.component';
import { ColorBarComponent } from './color-bar/color-bar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} }

@NgModule({
  declarations: [
    AppComponent,
    TheButtonComponent,
    HomeComponent,
    ColorBarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
