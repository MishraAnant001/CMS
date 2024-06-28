import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetContentComponent } from './get-content/get-content.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { ViewContentComponent } from './view-content/view-content.component';

const routes: Routes = [
  {
    path:"get-content",
    component:GetContentComponent
  },
  {
    path:"upload-content",
    component:UploadContentComponent
  },
  {
    path:"view-content",
    component:ViewContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
