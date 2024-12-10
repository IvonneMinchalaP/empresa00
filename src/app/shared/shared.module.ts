import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { DxButtonModule, DxMenuModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [
    FooterComponent,
    LayoutComponent,
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
    LayoutComponent,
    HeaderComponent,
    SlidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
