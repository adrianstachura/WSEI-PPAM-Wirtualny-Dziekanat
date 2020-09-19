import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './user.model'; // optional
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private _snackBar: MatSnackBar){ 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        // Logged out
        return of(null);
      }
    })
  )}

  //Wyświetlanie snackbar'a

  openSnackBarError(message, action){
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar-warning']
    })
  }

  //Logowanie użytkownika

  async emailSignin(email: string, password : string){
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email,password)
      this.router.navigate(['/home']);
      
    }
    
    catch (error) {
      console.log('Wrong email/password')
      this.openSnackBarError('Dane logowania nie są poprawne', 'X');
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}