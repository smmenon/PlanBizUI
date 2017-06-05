import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';

import {SelfbitsAngular} from "selfbits-angular2-sdk";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  public error:boolean=false;
  public errorMessage:string='';  

  constructor(fb:FormBuilder, 
          private auth:AuthService, 
          private router:Router,
          private sb:SelfbitsAngular) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:any):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
        this.auth.login({email:values.email, password:values.password}).subscribe(res =>{
            console.log(res);
            if(res.status === 200){
              this.router.navigate(['pages/dashboard'])
            }
          }, err => {
            //do something with error
            this.error = true;
            this.errorMessage = err.json().message;
          })
    }
  }
  
  public social(provider:string){
      this.sb.auth.social(provider).subscribe(res => {
        if(res.status === 200){
          this.router.navigate(['pages']);
        }
      })
    }
}
