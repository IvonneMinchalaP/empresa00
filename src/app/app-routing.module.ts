import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesRoutingModule } from './feature/feature-routing';
import { FeatureComponent } from './feature/feature.component';
import { EmpresasComponent } from './feature/empresas/empresas.component';
import { EmpleadosComponent } from './feature/empleados/empleados.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  { path: '', component: EmpresasComponent },
//{ path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'login', component: FeatureComponent, data:{ titulo:'Login' } },
  //{ path: 'empresas', component: EmpresasComponent, data:{ titulo:'Empresas' } },
  //{ path: 'empleados', component: EmpleadosComponent, data:{ titulo:'Empleados' } },
  {path: '',
    component: LayoutComponent,
    children: [
      { path: 'empresas', component: EmpresasComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: '', redirectTo: 'page1', pathMatch: 'full' }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FeaturesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
