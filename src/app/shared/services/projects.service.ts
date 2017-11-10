import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Project, ProjectListConfig } from '../models';

@Injectable()
export class ProjectsService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: ProjectListConfig): Observable<{projects: Project[], projectsCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    Object.keys(config.filters)
    .forEach((key) => {
      params.set(key, config.filters[key]);
    });

    return this.apiService
    .get(
      '/projects' + ((config.type === 'feed') ? '/feed' : ''),
      params
    ).map(data => data);
  }

  get(slug): Observable<Project> {
    return this.apiService.get('/projects/' + slug)
           .map(data => data.project);
  }

  destroy(slug) {
    return this.apiService.delete('/projects/' + slug);
  }

  save(project): Observable<Project> {
    // If we're updating an existing project
    console.log(project||JSON);
    if (project.slug) {
      return this.apiService.put('/projects/' + project.slug, {project: project})
             .map(data => data.project);
             

    // Otherwise, create a new project
    } else {
      return this.apiService.post('/projects/', {project: project})
             .map(data => data.project);
    }
    
  }

  favorite(slug): Observable<Project> {
    return this.apiService.post('/projects/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Project> {
    return this.apiService.delete('/projects/' + slug + '/favorite');
  }


}
