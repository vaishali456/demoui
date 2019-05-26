import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageComponent } from './stage.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [StageComponent, SidebarComponent],
  exports: [StageComponent]
})
export class StageModule { }
