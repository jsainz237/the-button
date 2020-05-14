import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { TheButtonComponent } from './the-button/the-button.component';
import { HomeComponent } from './home/home.component';
import { ColorBarComponent } from './color-bar/color-bar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { colorReducer } from 'src/state/color/color.reducer';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { userReducer } from 'src/state/user/user.reducer';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} }

@NgModule({
  declarations: [
    AppComponent,
    TheButtonComponent,
    HomeComponent,
    ColorBarComponent,
    LoginComponent,
    RegisterComponent,
    SuccessComponent
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
    NgbTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
