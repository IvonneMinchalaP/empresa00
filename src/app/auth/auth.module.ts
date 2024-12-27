import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    DxButtonModule,
    DxFormModule,
    
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ],
})
export class AuthModule { }
