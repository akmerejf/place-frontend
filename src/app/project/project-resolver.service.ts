import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Project, ProjectsService, UserService } from '../shared';

@Injectable()
export class ProjectResolver implements Resolve<Project> {
  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.projectsService.get(route.params['slug'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
