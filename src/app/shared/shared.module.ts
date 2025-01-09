import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { DxButtonModule, DxMenuModule, DxSwitchModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



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
    DxSwitchModule,
    FormsModule
  
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SlidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
