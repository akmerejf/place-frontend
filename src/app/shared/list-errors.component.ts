import { Component, Input } from '@angular/core';

import { Errors } from './models';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];
  resendEmail: boolean = false;
  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];
    

     errorList.status==418?this.resendEmail=true:this.resendEmail=false;
    

    for (const field in errorList.errors) {
      this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
    }
   
   
  };


  get errorList() { 
    
    return this.formattedErrors; 
  }


}
