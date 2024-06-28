import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { ManageContentComponent } from './manage-content/manage-content.component';
import { MediaFeedComponent } from './media-feed/media-feed.component';
import { ContentFeedComponent } from './content-feed/content-feed.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
  },
  {
    path:"media",
    loadChildren:()=>import("./media/media.module").then((m)=>m.MediaModule)
  },
  {
    path:"content",
    loadChildren:()=>import("./content/content.module").then((m)=>m.ContentModule)
  },
  {
    path:"users",
    component:UsersComponent
  },{
    path:"manage-media",
    component:ManageMediaComponent
  },
  {
    path:"manage-content",
    component:ManageContentComponent
  },
  {
    path:"media-feed",
    component:MediaFeedComponent
  },
  {
    path:"content-feed",
    component:ContentFeedComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
