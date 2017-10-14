import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Project, ProjectsService } from '../shared';

@Component({
  selector: 'editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  project: Project = new Project();
  projectForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // use the FormBuilder to create a form group
    this.projectForm = this.fb.group({
      title: '',
      image: '',
      description: '',
      body: '',
    });
    // Optional: subscribe to value changes on the form
    // this.projectForm.valueChanges.subscribe(value => this.updateProject(value));
  }

  ngOnInit() {
    // If there's an project prefetched, load it
    this.route.data.subscribe(
      (data: {project: Project}) => {
        if (data.project) {
          this.project = data.project;
          this.projectForm.patchValue(data.project);
        }
      }
    );
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.project.tagList.indexOf(tag) < 0) {
      this.project.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.project.tagList = this.project.tagList.filter((tag) => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateProject(this.projectForm.value);

    // post the changes
    this.projectsService
    .save(this.project)
    .subscribe(
      project => this.router.navigateByUrl('/project/' + project.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateProject(values: Object) {
    (<any>Object).assign(this.project, values);
  }
}
