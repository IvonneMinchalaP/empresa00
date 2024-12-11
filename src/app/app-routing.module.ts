import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesRoutingModule } from './feature/feature-routing';


const routes: Routes = [

  { path: '', redirectTo: '/feature', pathMatch: 'full' }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FeaturesRoutingModule,
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
