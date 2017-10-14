import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditableProjectResolver } from './editable-project-resolver.service';
import { ImageUploadModule } from "angular2-image-upload";
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      project: EditableProjectResolver
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    EditorComponent
  ],
  providers: [
    EditableProjectResolver
  ]
})
export class EditorModule {}
