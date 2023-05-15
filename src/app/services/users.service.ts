import { Injectable } from '@angular/core';
import {
  getAuth,
  onAuthStateChanged,
  Auth,
  authState,
} from '@angular/fire/auth';
import { User } from '../models/user';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersCollListener = new BehaviorSubject<any>({ users: [] });
  currentUserData: User;
  currentUserDataID: any;
  users: any = [];
  currentUser$ = authState(this.auth);
  userData: any;

  constructor(
    private afs: Firestore,
    private firestore: AngularFirestore,
    private auth: Auth
  ) {}

  
  /**
   * upon succesfull authentication the currentUser is assinged and the data is set accordingly
   */  
  async getCurrentUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userData = user;
        this.currentUserDataID = user.uid;
      }
      this.firestore
        .collection('users')
        .doc(this.currentUserDataID)
        .valueChanges()
        .pipe(untilDestroyed(this))
        .subscribe((changes: any) => {
          this.currentUserData = changes;
        });
    });
  }


  /**
   * gets all users of the users collection to display a list to choose from in dialog-create-directmessage and dialog-create-channel
   */
  getAllUsers(): any {
    const usersCollection = collection(this.afs, 'users');
    const users$ = collectionData(usersCollection, { idField: 'uid' });
    users$.pipe(untilDestroyed(this)).subscribe((_users) => {
      this.usersCollListener.next({ users: _users });
      this.sortUsers(_users);
    });
  }


  /**
   * function to sort users by name
   */
  sortUsers(_users: DocumentData[]) {
    this.removeGuest(_users)
    this.users = _users;
    this.users.sort((a, b) => {
      if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
        return -1;
      } else if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  /**
   * removes the guest from the list since guest is not a real user
   * @param _users - array of all users
   */
  removeGuest(_users: DocumentData[]) {
    _users.splice(
      _users.findIndex((user) => 
        user["uid"] == "Br68JJNC4PYPLrkI3iboILMpFYZ2"
      )
    , 1);
  }


  /**
   * updates currentUser data and posts the data to the firebase db(used for image upload)
   * @param user - currentUser
   */
  updateUser(user: any): Observable<void> {
    const ref = doc(this.afs, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }


  /**
   * The set of functions below takes any users id and returns a color HSL unique to the user id
   * @param str - user id
   * @returns 
   */
  getHashOfString(str: any) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  }

  normalizeHash(hash: any, min, max) {
    return Math.floor((hash % (max - min)) + min);
  }

  generateHSL(name: any) {
    const hash = this.getHashOfString(name);
    const h = this.normalizeHash(hash, 1, 360);
    const s = this.normalizeHash(hash, 50, 75);
    const l = this.normalizeHash(hash, 25, 70);
    return [h, s, l];
  }

  HSLtoString(hsl: any) {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  }

  generateColorHsl(id: string) {
    if (id !== null) return this.HSLtoString(this.generateHSL(id));
    else return '';
  }
}
