import { DatePipe } from '@angular/common';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  panelOpenState = false;
  items;
  tytul;
  tresc;
  currentDateString;
  nazwisko;
  role;

  constructor(private afs: AngularFirestore, private _snackBar: MatSnackBar, private datePipe: DatePipe, public auth:AuthService) { }

    currentDate = new Date();

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

  ngOnInit(): void {
    this.items = this.afs.collection("ogloszenia", ref => ref.orderBy('timestamp', 'desc')).valueChanges();
    this.currentDateString = this.datePipe.transform(this.currentDate, 'dd.MM.yyyy');

    this.auth.user$.subscribe( user$ => {
      if (user$) { this.nazwisko = user$.imieNazwisko }
    });

    this.auth.user$.subscribe( user$ => {
      if (user$) {this.role = user$.role}
    })
  }

  //Dodawanie ogłoszenia

  addAnn(){
    try {

      this.afs.collection('ogloszenia').doc(this.tresc).set({
        tekst: this.tresc,
        tytul: this.tytul,
        data: this.currentDateString,
        autor: this.nazwisko,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.openSnackBarSucces('Pomyślnie dodano nowe ogłoszenie!', 'X');
    }

    catch (error) {
      console.log('Input must be a valid string')
      this.openSnackBarError('Uzupełni wszystkie pola"', 'X');
    }
  }

  fetusDeletus(a){
    this.afs.collection('ogloszenia').doc(a).delete()
  }

}
