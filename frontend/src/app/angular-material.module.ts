import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatProgressBarModule
 } from '@angular/material';

@NgModule({

  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  providers: [],
})
export class AngularMaterialModule {}
