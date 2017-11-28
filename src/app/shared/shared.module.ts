import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ProjectListComponent, ProjectMetaComponent, ProjectPreviewComponent } from './project-helpers';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AsideComponent } from './layout/aside/aside.component';
import { AsideButtonsComponent } from './project-helpers/aside-buttons/aside-buttons.component';
import { FacebookButtonComponent } from './buttons/facebook-button/facebook-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectMetaComponent,
    ProjectPreviewComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    FileUploadComponent,
    AsideComponent,
    AsideButtonsComponent,
    FacebookButtonComponent,
  ],
  exports: [
    ProjectListComponent,
    ProjectMetaComponent,
    ProjectPreviewComponent,
    CommonModule,
    FavoriteButtonComponent,
    FollowButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective,
    FileUploadComponent,
    AsideComponent,
    AsideButtonsComponent,
    FacebookButtonComponent
  ]
})
export class SharedModule {}
