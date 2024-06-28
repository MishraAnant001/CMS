import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { GetContentComponent } from './get-content/get-content.component';
import { ReactiveFormsModule } from '@angular/forms';
import {TableModule} from "primeng/table";
import { ViewContentComponent } from './view-content/view-content.component'


@NgModule({
  declarations: [
    UploadContentComponent,
    GetContentComponent,
    ViewContentComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ReactiveFormsModule,
    TableModule

  ]
})
export class ContentModule { }
