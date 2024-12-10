import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesRoutingModule } from './feature/feature-routing';
import { FeatureComponent } from './feature/feature.component';
import { EmpresasComponent } from './feature/empresas/empresas.component';
import { EmpleadosComponent } from './feature/empleados/empleados.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: '', component: EmpleadosComponent },
//{ path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'login', component: FeatureComponent, data:{ titulo:'Login' } },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'empleados', component: EmpleadosComponent, data:{ titulo:'Empleados' } },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FeaturesRoutingModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
