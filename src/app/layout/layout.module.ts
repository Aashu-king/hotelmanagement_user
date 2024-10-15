import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FullComponent } from './full/full.component';
import { FooterComponent } from './footer/footer.component';
import { BlankComponent } from './blank/blank.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FullComponent,
    FooterComponent,
    BlankComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
