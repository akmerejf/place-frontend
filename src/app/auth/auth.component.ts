import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Errors, UserService, User } from '../shared';
declare var swal: any;
@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      console.log('configured routes: ', this.router.config);
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }
    confirmEmail() {
        swal({
        title: 'Obrigado por se registrar! ;)',
        text: "Nós lhe enviamos um email com instruções para confirmar sua conta.",        
        confirmButtonColor: '#3085d6',        
        imageUrl: './assets/images/mail.jpg',
        imageWidth: 400,
        imageHeight: 300,
        confirmButtonText: 'Okey!'
      });
    }


  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials = this.authForm.value;
    if(this.authType=='login'){
      this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }else{
      this.userService
      .createAccount(this.authType, credentials)
      .subscribe(
        data => {
          this.confirmEmail();
          this.router.navigateByUrl('/');
        },
        err => {
          this.errors = err;
          console.log(this.errors.status);
          this.isSubmitting = false;
        }
      );
    }
  }
}
