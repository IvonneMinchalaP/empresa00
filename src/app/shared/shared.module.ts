import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { DxButtonModule, DxMenuModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { FeatureComponent } from '../feature/feature.component';
import { UsuarioService } from '../services/Usuario.service';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SlidebarComponent
    

  ],
  imports: [
    CommonModule,
    RouterModule,
    DxButtonModule,
    DxMenuModule,
  
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SlidebarComponent
  ],
})
export class SharedModule { }
