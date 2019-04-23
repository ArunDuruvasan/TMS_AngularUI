import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};  
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(        
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
             // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
   
    onSubmit() { 
        this.loading = true;
        // stop here if form is invalid

        // if ((this.model.username.trim() == undefined||this.model.username.trim() == '')
        //     &&(this.model.password.trim()  == undefined||this.model.password.trim()  == '')
        //     &&(this.model.company.trim()  == undefined||this.model.company.trim()  == ''))
        //  {
        //     this.error = 'All fields are required!';
        //     this.loading = false;
        //     return;
        // }
        // else if ((this.model.username.trim() != undefined||this.model.username.trim() != '')
        //     &&(this.model.password.trim()  == undefined||this.model.password.trim()  == '')
        //     &&(this.model.company.trim()  == undefined||this.model.company.trim()  == ''))
        //  {
        //     this.error = 'Password and Company are required!';
        //     this.loading = false;
        //     return;
        // }
        // else if ((this.model.username.trim() != undefined||this.model.username.trim() != '')
        //     &&(this.model.password.trim()  != undefined||this.model.password.trim()  != '')
        //     &&(this.model.company.trim()  == undefined||this.model.company.trim()  == ''))
        //  {
        //     this.error = 'Company is required!';
        //     this.loading = false;
        //     return;
        // }
        // else if ((this.model.username.trim() != undefined||this.model.username.trim() != '')
        //     &&(this.model.password.trim()  == undefined||this.model.password.trim()  == '')
        //     &&(this.model.company.trim()  == undefined||this.model.company.trim()  == ''))
        //  {
        //     this.error = 'Username is required!';
        //     this.loading = false;
        //     return;
        // }

       
        this.authenticationService.login(this.model.username, this.model.password,this.model.company)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['dashboard']);
                },
                error => {
                    this.error = 'Invalid Credentials!';
                    this.loading = false;
                });              
    }
}
