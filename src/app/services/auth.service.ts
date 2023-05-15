import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { updateProfile, updateEmail } from 'firebase/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ok: Observable<any>
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  /**
   * 
   * @param email - string  
   * @param password - string
   * @returns promise that logs in the user with email and password
   */  
  async loginUser(email: string, password: string): Promise<any> {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afs.collection('users').doc( result.user?.uid).update({status: true})
        this.router.navigate(['/home/threads-list']);
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
      });
  }

  /**
   * 
   * @param user - user Object with user credentials
   * @returns promise that signs up the user 
   */  
  async signupUser(user: any): Promise<any> {
    return await this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(async (result) => {
        await updateProfile(result.user!, {
          displayName: user?.displayName,
        });
        this.SetUserData(result.user); // sending user json and uid
        result.user!.sendEmailVerification(); // immediately send the user a verification email
        this.afs.collection('users').doc( result.user?.uid).update({status: true})
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
      });
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      status: false,
      photoURL: null
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  async updateUserEmail(userData, newEmail: string) {
    await updateEmail(userData, newEmail)
  }
}
