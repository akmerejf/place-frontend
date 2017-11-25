import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectListConfig, TagsService, UserService } from '../shared';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;
  listConfig: ProjectListConfig = new ProjectListConfig();
  tags: Array<string> = [];
  tagsLoaded = false;
  placeLogo: String;
  currentList: string = "Vitrine";
  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the project list accordingly
        if (authenticated) {

          switch (this.currentList) {

            case "Eventos":
              this.setListTo('Eventos');
              break;

            case "Fomento":
              this.setListTo('Fomento');
              break;

            case "Network":
              this.setListTo('Network');
              break;
            
            default:
              this.setListTo('Vitrine');
              break;
          }

        } else {
          this.setListTo('Vitrine');
        }
      }
    );

    this.tagsService.getAll()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }
  

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    // if (type === 'Eventos' && !this.isAuthenticated) {
    //   this.router.navigateByUrl('/login');
    //   return;
    // }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }

  
}
