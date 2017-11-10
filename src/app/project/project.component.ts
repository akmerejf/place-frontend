import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from '../../environments/environment'

import {
  Project,
  ProjectsService,
  Comment,
  CommentsService,
  User,
  UserService
} from '../shared';

@Component({
  selector: 'project-page',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  project: Project;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  envPath = environment.image_url;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched project
    this.route.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;

        // Load the comments on this project
        this.populateComments();
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.project.author.username);
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.project.favorited = favorited;

    if (favorited) {
      this.project.favoritesCount++;
    } else {
      this.project.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.project.author.following = following;
  }

  deleteProject() {
    this.isDeleting = true;

    this.projectsService.destroy(this.project.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.project.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.project.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        }
      );
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.project.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
