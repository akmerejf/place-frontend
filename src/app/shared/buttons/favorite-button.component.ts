import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../models';
import { ProjectsService, UserService } from '../services';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html',  
  styleUrls:['./favorite-button.component.css'],
})
export class FavoriteButtonComponent {
  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private userService: UserService,
  ) { 
   
   
   
  }

  @Input() project: Project;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;
  
  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          
          return;
        }

        // Favorite the project if it isn't favorited yet
        if (!this.project.favorited) {
          this.projectsService.favorite(this.project.slug)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

        // Otherwise, unfavorite the project
        } else {
          this.projectsService.unfavorite(this.project.slug)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(false);
            },
            err => this.isSubmitting = false
          );
        }

      }
    )


  }

}
