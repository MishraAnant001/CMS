import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetMediaComponent } from './get-media/get-media.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';

const routes: Routes = [
  {
    path:"get-media",
    component:GetMediaComponent
  },
  {
    path:"upload-media",
    component:UploadMediaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
