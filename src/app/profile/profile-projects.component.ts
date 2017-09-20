import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-projects',
  templateUrl: './profile-projects.component.html'
})
export class ProfileProjectsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  projectsConfig: ProjectListConfig = new ProjectListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.projectsConfig = new ProjectListConfig(); // Only method I found to refresh project load on swap
        this.projectsConfig.filters.author = this.profile.username;
      }
    );
  }

}
