import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';
import { ProjectCommentComponent } from './project-comment.component';
import { ProjectResolver } from './project-resolver.service';
import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../shared';

const projectRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'project/:slug',
    component: ProjectComponent,
    resolve: {
      project: ProjectResolver
    }
  }
]);

@NgModule({
  imports: [
    projectRouting,
    SharedModule
  ],
  declarations: [
    ProjectComponent,
    ProjectCommentComponent,
    MarkdownPipe
  ],

  providers: [
    ProjectResolver
  ]
})
export class ProjectModule {}
