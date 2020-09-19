import { Component, OnInit, AfterViewInit, Pipe } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IfStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-timetable-panel',
  templateUrl: './add-timetable-panel.component.html',
  styleUrls: ['./add-timetable-panel.component.css']
})

export class AddTimetablePanelComponent implements AfterViewInit, OnInit {

  godzina = "godzina";
  zajecie = "zajecia";
  sala = "sala";
  wykladowca = "wykladowca";
  data: string;
  role;

  grupy: Observable<any[]>;
  sale: Observable<any[]>;
  wykladowcy: Observable<any[]>;
  zajecia: Observable<any[]>;

  constructor(private afs: AngularFirestore, public auth:AuthService,private datePipe: DatePipe, private _snackBar: MatSnackBar) { }

  ngOnInit(): void{
    this.auth.user$.subscribe( user$ => {
      if (user$) {this.role = user$.role}
    })
  }

  ngAfterViewInit(): void {
    this.grupy=this.afs.collection('grupy').valueChanges();
    this.sale=this.afs.collection('sale').valueChanges();
    this.wykladowcy=this.afs.collection('wykladowcy').valueChanges();
    this.zajecia=this.afs.collection('zajecia').valueChanges();
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

  //Pentala sprawdzająca poprawność wprowadzonych danych oraz dodająca wybrane zajęcia do planu dane grupy

  addTimetable(){
    try {
      for (let i=1; i< 11;i++){
        var grupa = document.getElementById('grupa').innerText.replace('\t','')
        var godzinaInput =document.getElementById(this.godzina+i).innerText.replace('\t','');
        var zajecieInput = document.getElementById(this.zajecie+i).innerText.replace('\t','');
        var salaInput = document.getElementById(this.sala+i).innerText.replace('\t','');
        var wykladowcaInput = document.getElementById(this.wykladowca+i).innerText.replace('\t','');
  
        if(zajecieInput == "" || salaInput == "" || wykladowcaInput == "" || this.data == undefined || grupa=="")
        {
        }
        else {
          const dane ={
            data: this.data,
            godzina: godzinaInput,
            nazwa: zajecieInput,
            sala: salaInput,
            wykladowca: wykladowcaInput
          }
          
      
  
          this.afs.collection('plan').doc('planWykladowcow').collection(wykladowcaInput).add(dane);
          this.afs.collection('plan').doc(grupa).collection('zajecia').add(dane);
          this.openSnackBarSucces('Pomyślnie dodano nowe zajęcia do planu', 'X');
        }
      }
    } catch (error) {

    }
  }

  getDate(data:any){
    this.data= this.datePipe.transform(data,'dd.MM.yyyy')
    console.log(this.data)
  }
}


