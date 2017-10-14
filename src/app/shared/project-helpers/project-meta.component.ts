import { Component, Input } from '@angular/core';

import { Project } from '../models';

@Component({
  selector: 'project-meta',
  templateUrl: './project-meta.component.html',
  styleUrls: ['./project-preview.component.css']
})
export class ProjectMetaComponent {
  @Input() project: Project;
}
