import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;
  hide = true;
  firebaseErrorMessage: string;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    public authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.firebaseErrorMessage = '';
  }

  /**
   * firebase function that logs in the user with given user credentials
   */
  loginUser() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        if (result == null) {
          // null is success, false means there was an error
          this.router.navigate(['/home/threads-list']); // when the user is logged in, navigate them to dashboard
        } else if (result.isValid == false) {
          this.firebaseErrorMessage = result.message;
        }
        this.loading = false;
      });
  }
}
