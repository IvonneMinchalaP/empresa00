import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { SharedModule } from '../shared/shared.module';
import { DxAccordionModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxMenuModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxSliderModule, DxTagBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from './feature-routing';
import { EmpleadosService } from '../services/empleados.service';
import { EmpresasService } from '../services/empresas.service';
import { SidebarService } from '../services/sidebar.service';
import { HomeComponent } from './home/home.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ContactanosComponent } from './contacto/contactanos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from '../services/Usuario.service';



@NgModule({
  declarations: [
    FeatureComponent,
    EmpleadosComponent,
    EmpresasComponent,
    HomeComponent,
    ConocenosComponent,
    ContactanosComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    DxMenuModule,
    RouterModule,
    DxButtonModule,
    DxDataGridModule, // Grid para manejar datos
    FeaturesRoutingModule,
    DxPopupModule,
    DxTextBoxModule,
    FormsModule,
    ReactiveFormsModule,
    DxDateBoxModule,
    SharedModule,
    DxAccordionModule, // Módulo del acordeón
    DxTemplateModule,  // Módulo para las plantillas
    DxCheckBoxModule,
    DxSliderModule,
    DxTagBoxModule,
    DxScrollViewModule,
    DxFormModule,
    DxSelectBoxModule


],
  providers: [
    EmpleadosService,
    EmpresasService,
    UsuarioService,
    SidebarService
  ],
  exports:[
    EmpleadosComponent,
    EmpresasComponent,
    UsuarioComponent,
    HomeComponent,
    ConocenosComponent,
    ContactanosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class FeatureModule { }
