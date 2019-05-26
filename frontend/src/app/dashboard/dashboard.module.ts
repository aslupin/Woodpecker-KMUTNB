import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component"

import { TableModule } from '../element/table/table.module';
import { GraphModule } from '../element/graph/graph.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TableModule,
    GraphModule
  ],
  exports: [],
  providers: []
})
export class DashBoardModule {}
