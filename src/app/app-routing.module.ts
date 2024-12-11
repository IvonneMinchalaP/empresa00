import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesRoutingModule } from './feature/feature-routing';
import { AuthRoutingModule } from './auth/auth-routing';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule,
    FeaturesRoutingModule
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
