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
  UserService,
  FileService,
  FileUploadComponent,
  Image
} from '../shared';

@Component({
  selector: 'project-page',
  templateUrl: './project.component.html',
  styleUrls:['./project.component.css'],
  providers: [FileService]
})
export class ProjectComponent implements OnInit {
  project: Project;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  projectImage: Image = new Image();
  imageErrors = {};
  isSubmitting = false;
  isDeleting = false;
  envPath = environment.image_url;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private commentsService: CommentsService,
    private fileService: FileService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched project
    this.route.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
        this.getImageData(data.project.slug);
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

  refreshImages(status){
    if (status == true){
      
      this.getImageData(this.project.slug);
    }
  }
  
  getImageData(slug){
    this.fileService.getImages(slug).subscribe(       
      data =>{ this.projectImage = data;},
      error => this.imageErrors = error
    )
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

  changeBackground(): any{
    return {
      
        'background': 'linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('+this.envPath+(this.projectImage.url)+') no-repeat',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position':'center center',
        'color': '#fff',
        'height': '312px',
        'width': '820px',
        
    
    };
  }
}
