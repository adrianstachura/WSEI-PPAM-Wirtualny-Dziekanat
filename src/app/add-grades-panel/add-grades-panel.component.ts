import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import {Subject} from '../subject'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-grades-panel',
  templateUrl: './add-grades-panel.component.html',
  styleUrls: ['./add-grades-panel.component.css']
})
export class AddGradesPanelComponent implements OnInit, AfterViewInit {

  constructor(private afs:AngularFirestore, private auth:AuthService, private _snackBar: MatSnackBar) { }

  kierunki: Observable<any[]>;
  nralbumu; przedmiot;ocena;semestr;userid;nazwisko;role;

  ngAfterViewInit(): void {
    this.auth.user$.subscribe( user$ => {
      if (user$) { this.nazwisko = user$.imieNazwisko }
    });
  }

  ngOnInit(): void {
    this.auth.user$.subscribe( user$ => {
      if (user$) {this.role = user$.role}
    })
  }

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

  //Lista przedmiotów

  getSubjectList(){
    this.kierunki = this.afs.collection('users').doc(this.userid).collection('Semestr '+this.semestr, ref => ref.where('prowadzacy', '==', this.nazwisko)).valueChanges();
  }

  //Dodanie oceny dola wybranego nr indeksu/semestru/przedmiotu

  addGrade(){
    try {
      var sem = "Semestr "+this.semestr
      const userRef: AngularFirestoreDocument<Subject> = this.afs.doc(`users/${this.userid}/${sem}/${this.przedmiot}`);
      const data = {
        ocena: this.ocena
      }
      if(this.przedmiot == undefined){
        this.openSnackBarError('Uzupełni wszystkie pola', 'X');
      }else{
        userRef.set(data, { merge: true })
        this.openSnackBarSucces('Pomyślnie dodano ocenę', 'X');
      }
    } catch (error) {
      this.openSnackBarError('Uzupełni wszystkie pola', 'X');
    }
  }

  getNrAlbumu(){
   this.afs.collection('users', ref => ref.where('studentId', '==', this.nralbumu))
   .get().toPromise().then(result => {
     if(result.docs[0] == undefined)
     {
     
     }
     else{
       console.log(result.docs[0].data().uid)
        this.userid = result.docs[0].data().uid;
      }
    });
  }
}
