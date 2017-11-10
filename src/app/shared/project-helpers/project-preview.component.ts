import { Component, Input, OnInit } from '@angular/core';

import { Project } from '../models';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css']
})
export class ProjectPreviewComponent {
  @Input() project: Project;
  envPath = environment.image_url;
  constructor(){
    
  }
  onToggleFavorite(favorited: boolean) {
    this.project['favorited'] = favorited;

    if (favorited) {
      this.project['favoritesCount']++;
    } else {
      this.project['favoritesCount']--;
    }
  }
}
