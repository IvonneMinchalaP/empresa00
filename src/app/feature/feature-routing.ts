import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { FeatureComponent } from './feature.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ContactanosComponent } from './contacto/contactanos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { GeografiaComponent } from './Geografia/geografia.component';

const routes: Routes = [
  {path: 'feature', 
    component: FeatureComponent,
    children: [
     
      { path: 'empresas', component: EmpresasComponent },
      { path: 'empleados', component: EmpleadosComponent},
      { path: 'geografia', component: GeografiaComponent } ,
      { path: 'usuario', component: UsuarioComponent},
      { path: 'conocenos', component: ConocenosComponent },  
      { path: 'contactanos', component: ContactanosComponent }, 
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}