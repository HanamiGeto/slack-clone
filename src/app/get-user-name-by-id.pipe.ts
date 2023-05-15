import { Pipe, PipeTransform } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Pipe({
  name: 'getUserNameById'
})
export class GetUserNameByIdPipe implements PipeTransform {
  constructor(private firestore: AngularFirestore){

  }

  transform(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges({idField: 'id'});
  }

}
