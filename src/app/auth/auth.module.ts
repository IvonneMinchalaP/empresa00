import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DxAccordionModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxPopupModule, DxScrollViewModule, DxSliderModule, DxTagBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from './register/register.component';
import { UsuarioComponent } from './Usuario/usuario.component';
import { FeaturesRoutingModule } from '../feature/feature-routing';
import { SharedModule } from '../shared/shared.module';
import { UsuarioService } from '../services/Usuario.service';
import { SidebarService } from '../services/sidebar.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    DxButtonModule,
    DxFormModule,
    DxDataGridModule, // Grid para manejar datos
    FeaturesRoutingModule,
    DxPopupModule,
    DxTextBoxModule,
    DxDateBoxModule,
    SharedModule,
    DxAccordionModule, // Módulo del acordeón
    DxTemplateModule,  // Módulo para las plantillas
    DxCheckBoxModule,
    DxSliderModule,
    DxTagBoxModule,
    DxScrollViewModule
    
  ],
   providers: [
      UsuarioService,
      SidebarService
    ],
  exports:[
    LoginComponent,
    RegisterComponent
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AuthModule { }
