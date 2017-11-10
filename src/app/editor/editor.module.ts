import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditableProjectResolver } from './editable-project-resolver.service';
import { AuthGuard, SharedModule } from '../shared';
import { Decode64Pipe } from './pipes/decode64.pipe';

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
  ],
  declarations: [
    EditorComponent,
    Decode64Pipe
    // ImageUploadComponent
  ],
  providers: [
    EditableProjectResolver
  ]
})
export class EditorModule {}
