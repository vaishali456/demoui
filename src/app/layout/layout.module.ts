import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';

import { HeaderComponent } from '../header/header.component';
import { StageModule } from '../stage/stage.module';

@NgModule({
  imports: [
    CommonModule, StageModule
  ],
  declarations: [
    LayoutComponent,HeaderComponent
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
