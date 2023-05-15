import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  firebaseErrorMessage: string;
  loading: boolean = false;
  hide = true;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {    this.firebaseErrorMessage = '';
  }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /**
   * firebase function to sign up a user. creates a new user.
   */
  signUp() {
    if (this.registerForm.invalid) return;
    this.authService
      .signupUser(this.registerForm.value)
      .then((result) => {
        if (result == null) {    // null is success
          
          this.router.navigate(['/home/threads-list']);
        } 
        else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;
      })
      .catch((err) => {
        console.log(err)
      });
  }
}