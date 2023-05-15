import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { UserImageService } from '../services/user-image.service';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userName: string;
  userUid: string;
  userEmail: string;
  userStatus: boolean;
  user$ = this.usersService.currentUser$;
  oldEmail: string;
  isGuest: boolean = false;
  /**
   *
   */
  constructor(
    public usersService: UsersService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private userImageService: UserImageService,
    private toast: HotToastService,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.userName = this.usersService.currentUserData.displayName;
    this.userUid = this.usersService.currentUserData.uid;
    this.userEmail = this.usersService.currentUserData.email;
    this.oldEmail = this.userEmail;
    this.userStatus = this.usersService.currentUserData.status;
    if(this.userName == "Guest")
    this.isGuest = true
  }

  /**
   * This function takes in the file event and user data and posts and image to the firebase storage
   * using linking it with the users unique id then notifies the user with a popup (ngNeat toastService)
   * @param event - chosen file
   * @param user - user data for image upload
   */
  uploadFile(event: any, user: any) {
    const uid = user.uid;
    this.userImageService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  updateData(UserData) {
    this.afs
      .collection('users')
      .doc(this.usersService.currentUserData.uid)
      .update(UserData)
      .then(() => {
        this.dialog.closeAll();
      });
  }

  /**
   * updates the user credentials in Firebase auth and firebase users collection accordingly
   */
  async updateUserCredentials() {
    const UserData = {
      displayName: this.userName,
      uid: this.userUid,
      email: this.userEmail,
      status: this.userStatus,
    };
    
    if (this.oldEmail !== this.userEmail) {
      this.auth
        .updateUserEmail(this.usersService.userData, this.userEmail);
      this.usersService
        .updateUser({ uid: this.userUid, email: this.userEmail })
    }

    this.updateData(UserData)
  }
}
