import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ChartsModule } from 'ng2-charts'
@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ChartsModule
  ],
  exports:[GraphComponent]
})
export class GraphModule { }
