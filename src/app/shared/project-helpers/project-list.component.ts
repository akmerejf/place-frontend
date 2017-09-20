import { Component, Input } from '@angular/core';

import { Project, ProjectListConfig } from '../models';
import { ProjectsService } from '../services';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent {
  constructor (
    private projectsService: ProjectsService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: ProjectListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: ProjectListConfig;
  results: Project[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1))
    }

    this.projectsService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.projects;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.projectsCount / this.limit)), (val, index) => index + 1);
    });
  }
}
