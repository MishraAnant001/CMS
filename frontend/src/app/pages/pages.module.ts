import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'primeng/chart';
import { UsersComponent } from './users/users.component';
import { ManageContentComponent } from './manage-content/manage-content.component';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { TableModule } from 'primeng/table';
import { MediaFeedComponent } from './media-feed/media-feed.component';
import { ContentFeedComponent } from './content-feed/content-feed.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ManageContentComponent,
    ManageMediaComponent,
    MediaFeedComponent,
    ContentFeedComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ChartModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
