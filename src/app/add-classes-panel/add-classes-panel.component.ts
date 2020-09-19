import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import {from, Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {Lecturer} from '../lecturer';
import {Admin} from '../admin';
import {User} from '../user.model'

@Component({
  selector: 'app-add-classes-panel',
  templateUrl: './add-classes-panel.component.html',
  styleUrls: ['./add-classes-panel.component.css']
})

export class AddClassesPanelComponent implements OnInit {

  nazwaPrzedmiotu; nazwaKierunku; nazwaGrupy; nazwaSali; ilosc;tytul; imieNazwisko; email; haslo;imieNazwiskoAdmin; emailAdmin; hasloAdmin; role;

  kierunki: Observable<any[]>;
  constructor(private afs: AngularFirestore, private _snackBar: MatSnackBar, private afAuth: AngularFireAuth, public auth: AuthService) { }

  //Wyświetlanie snackbar'a

  openSnackBarSucces(message, action){
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar-succes']
    })
  }

  openSnackBarError(message, action){
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar-warning']
    })
  }

  //Dodawanie przedmiotu

  addSubject(){
    try {
      const add = {
        nazwa: this.nazwaPrzedmiotu
      }
      this.afs.collection('zajecia').add(add);
      this.openSnackBarSucces('Pomyślnie dodano nowe zajęcia!', 'X');
    }

    catch (error) {
      console.log('Input must be a valid string')
      this.openSnackBarError('Uzupełni pole "Nazwa przedmiotu"', 'X');
    }
  }


  //Dodawanie kierunku studiów

  addSpeciality(){
    try {
      const add = {
        nazwa: this.nazwaKierunku,
        ilosc_semestrow: this.ilosc
      }

      this.afs.collection('nazwaKierunku').doc(this.nazwaKierunku).set(add);
      var g = parseInt(this.ilosc);
  
      for(var i = 1; i<g+1;i++){
        var str1 = "Semestr "
        var str2= i.toString();
        var res = str1.concat(str2);
        console.log(res)
        this.afs.collection('nazwaKierunku').doc(this.nazwaKierunku).collection(res).add({})
      }
      this.openSnackBarSucces('Pomyślnie dodano nowy kierunek!', 'X');
    } 

    catch (error) {
      console.log('Input must be a valid string')
      this.openSnackBarError('Uzupełni pole "Nazwa kierunku" oraz wybierz ilość semestrów', 'X');
    }
  }

  //Dodawanie grupy studenckiej

  addStudentGroup(){
    try {
      const add = {
        groupName: this.nazwaGrupy
      }
  
      const addColection = {
        zajecia: "zajecia"
      }
  
      this.afs.collection('grupy').add(add);
      this.afs.collection('plan').doc(this.nazwaGrupy).set({})
      this.afs.collection('plan').doc(this.nazwaGrupy).collection('zajecia').add({})
      this.openSnackBarSucces('Pomyślnie dodano nową grupe!', 'X');
    }

    catch (error) {
      console.log('Input must be a valid string')
      this.openSnackBarError('Uzupełni pole "Nazwa grupy"', 'X');
    }
  }

  //Dodawanie sali

  addClassroom(){
    try {
      const add = {
        nazwa: this.nazwaSali
      }
      this.afs.collection('sale').add(add);
      this.openSnackBarSucces('Pomyślnie dodano nową sale', 'X');
    } 

    catch (error) {
      console.log('Input must be a valid string')
      this.openSnackBarError('Uzupełni pole "Nazwa sali"', 'X');
    }
  }

  //Dodawanie wykładowcy

  addLecturer(){
    this.registerLecturer(this.email, this.haslo);
    this.openSnackBarSucces('Pomyślnie dodano nowego Wykładowce', 'X');
  }

  async registerLecturer (email: string, password: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password)
      return this.updateLecturerData(credential.user);
    }
    
    catch (error) {
      console.log('Input must be a valid string')
      this.openSnackBarError('Uzupełni pola w panelu "Dodaj Wykładowcę"', 'X');
    }
  }

  private updateLecturerData(user) {
    const lectRef: AngularFirestoreDocument<Lecturer> = this.afs.doc(`wykladowcy/${user.uid}`);
    const userRef: AngularFirestoreDocument<Lecturer> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: this.email,
      imieNazwisko: this.imieNazwisko,
      tytul: this.tytul,
      role: 'wykladowca'
    }
    lectRef.set(data, { merge: true })
    userRef.set(data, { merge: true })
  }

  //Dodawanie Admina

  addAdmin(){
    this.registerAdmin(this.emailAdmin, this.hasloAdmin);
    this.openSnackBarSucces('Pomyślnie dodano nowego Administratora!', 'X');
  }

  async registerAdmin (email: string, password: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password)
      return this.updateAdminData(credential.user);   
    }
    
    catch (error) {
      console.log('Input must be a valid string')
      this.openSnackBarError('Uzupełni pola w panelu "Dodaj Administratora"', 'X');
    }
  }

  private updateAdminData(user) {
    const admRef: AngularFirestoreDocument<Admin> = this.afs.doc(`admins/${user.uid}`);
    const userRef: AngularFirestoreDocument<Admin> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: this.emailAdmin,
      imieNazwisko: this.imieNazwiskoAdmin,
      role: 'admin'
    }
    admRef.set(data, { merge: true })
    userRef.set(data, { merge: true })
  }

  ngOnInit(): void {
    this.auth.user$.subscribe( user$ => {
      if (user$) {this.role = user$.role}
    })
  }

  ngAfterViewInit(): void {
    this.kierunki=this.afs.collection('nazwaKierunku').valueChanges();
  }
}
