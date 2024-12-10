import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { SharedModule } from '../shared/shared.module';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxMenuModule, DxPopupModule, DxTextBoxModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from './feature-routing';
import { EmpleadosService } from '../services/empleados.service';
import { EmpresasService } from '../services/empresas.service';



@NgModule({
  declarations: [
    FeatureComponent,
    EmpleadosComponent,
    EmpresasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
  ],
  providers: [
    EmpleadosService,
    EmpresasService
  ],
  exports:[
    EmpleadosComponent,
    EmpresasComponent
  ],
})
export class FeatureModule { }
