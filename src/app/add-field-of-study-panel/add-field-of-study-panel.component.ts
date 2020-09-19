import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-field-of-study-panel',
  templateUrl: './add-field-of-study-panel.component.html',
  styleUrls: ['./add-field-of-study-panel.component.css']
})
export class AddFieldOfStudyPanelComponent implements AfterViewInit, OnInit {
  kierunki: Observable<any[]>;
  przedmioty: Observable<any[]>;
  prowadzacys: Observable<any[]>;

  kierunek; semestr; przedmiot; iloscsem; prowadzacy; role;

  constructor(private afs:AngularFirestore, private _snackBar: MatSnackBar, private auth: AuthService) { }

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

  ngOnInit(): void{
    this.auth.user$.subscribe( user$ => {
      if (user$) {this.role = user$.role}
    })
  }

  ngAfterViewInit(): void {
    this.kierunki=this.afs.collection('nazwaKierunku').valueChanges();
    const docRef = this.afs.doc(`nazwaKierunku/a${this.kierunek}`)
    this.przedmioty=this.afs.collection('zajecia').valueChanges();
    this.prowadzacys=this.afs.collection('wykladowcy').valueChanges();
  }

  //Przypisywanie prowadzącego do wybranego przedmiotu w danym semestrze oraz na danym kierunku

  addPrzedmiot(){
    
    try {
      if(this.semestr>this.iloscsem){
        this.openSnackBarError(`Kierunek ${this.kierunek} przewidziany jest na ${this.iloscsem} semestry. Wprowadź poprawny semestr!`, 'X');
      }
      else if(this.semestr == undefined){
        this.openSnackBarError(`Wszystkie pola muszą zostać uzupełnione`, 'X');
      }
      else{
        const data ={
          name: this.przedmiot,
          prowadzacy: this.prowadzacy
        }
        this.afs.collection('nazwaKierunku').doc(this.kierunek).collection('Semestr '+this.semestr).doc(this.przedmiot).set(data);
        this.openSnackBarSucces('Pomyślnie dodano nowy przedmiot do semstru!', 'X');
      } 
    } catch (error) {
      this.openSnackBarError(`Wszystkie pola muszą zostać uzupełnione`, 'X');
    }
  }

  //Sprawdzanie ilosci semestrów dla danego kierunku

  getSemestrQuant(){
      this.afs.doc(`nazwaKierunku/${this.kierunek}`).get().subscribe(ref => {
      const doc = ref.data();
      console.log(doc.ilosc_semestrow)
      this.iloscsem = doc.ilosc_semestrow
    });
  }
}
