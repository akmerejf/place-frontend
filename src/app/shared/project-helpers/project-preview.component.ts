import { Component, Input } from '@angular/core';

import { Project } from '../models';

@Component({
  selector: 'project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css']
})
export class ProjectPreviewComponent {
  @Input() project: Project;

  onToggleFavorite(favorited: boolean) {
    this.project['favorited'] = favorited;

    if (favorited) {
      this.project['favoritesCount']++;
    } else {
      this.project['favoritesCount']--;
    }
  }
}
