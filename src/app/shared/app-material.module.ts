import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';

// Note: I'm not sure if this is a good way to make this type of list, but it seems to allow for reuse.
const SharedMaterialComponents = [
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDialogModule
];

@NgModule({
  imports: SharedMaterialComponents,
  exports: SharedMaterialComponents,
  declarations: []
})
export class AppMaterialModule { }
