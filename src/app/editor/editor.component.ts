import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Project, ProjectsService } from '../shared';
// import { ImageUploadComponent } from './image-upload.component';
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
    private fb: FormBuilder,
  ) {
    // use the FormBuilder to create a form group
    this.projectForm = this.fb.group({
      title: '',
      description: '',
      body: ''
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
         
          // this.project.image = (data.project.image);
          console.log(this.project ||JSON + " editor");
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
      project => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateProject(values: Object) {
    (<any>Object).assign(this.project, values);
  }

  
files : FileList;
filestring: string; 
getFiles(event){
  if(event){
    this.files = event.target.files;
    console.log(this.files);  
    var reader = new FileReader(); 
    reader.onload = this._handleReaderLoaded.bind(this); 
    reader.readAsBinaryString(this.files[0]);
    
  }
}
_handleReaderLoaded(readerEvt) { 
  var binaryString = readerEvt.target.result; 
  this.project.image = 'data:image/jpeg;base64,'+btoa(binaryString);  // Converting binary string data. 
} 





/* PARA UPLOAD DE IMAGENS 

  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////////////////////////////

*/

 
  
}
