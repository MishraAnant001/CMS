import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { GetMediaComponent } from './get-media/get-media.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetMediaComponent,
    UploadMediaComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    ReactiveFormsModule
  ]
})
export class MediaModule { }
