import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-edit-user-panel',
  templateUrl: './edit-user-panel.component.html',
  styleUrls: ['./edit-user-panel.component.css']
})
export class EditUserPanelComponent implements OnInit{

  role;

  constructor(private afs: AngularFirestore, public dialog:MatDialog,private _snackBar: MatSnackBar, private auth: AuthService) { }

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

  studentId; userid;semestr;zapisany;iloscsem;edited = false;

kierunki ={name:"",surname:"",studentId:"",ulica_stale:"",kod_stale:"",miejsce_stale:"",ulica_korespondencja:"",kod_korespondencja:"",miejsce_korespondencja:"",email:"",telefon:"",kierunek:""}
  ngOnInit(): void {
    this.auth.user$.subscribe( user$ => {
      if (user$) {this.role = user$.role}
    })
  }


  // pobranie danych użytkownika na bazie wpisanego numeru albumu
  getNrAlbumu(){
    this.afs.collection('users', ref => ref.where('studentId', '==', this.studentId))
    .get().toPromise().then(result => {
      if(result.docs[0] == undefined)
      {
        this.kierunki ={name:"",surname:"",studentId:"",ulica_stale:"",kod_stale:"",miejsce_stale:"",ulica_korespondencja:"",kod_korespondencja:"",miejsce_korespondencja:"",email:"",telefon:"",kierunek:""}
        this.edited=false;
      }
      else{
        this.userid = result.docs[0].data().uid;
        this.kierunki ={
         name:result.docs[0].data().name,
         surname:result.docs[0].data().surname,
         studentId:result.docs[0].data().studentId,
         ulica_stale:result.docs[0].data().ulica_stale,
         kod_stale:result.docs[0].data().kod_stale,
         miejsce_stale:result.docs[0].data().miejsce_stale,
         ulica_korespondencja:result.docs[0].data().ulica_korespondencja,
         kod_korespondencja:result.docs[0].data().kod_korespondencja,
         miejsce_korespondencja:result.docs[0].data().miejsce_korespondencja,
         email:result.docs[0].data().email,
         telefon:result.docs[0].data().telefon,
         kierunek:result.docs[0].data().kierunek}
         this.edited=true;
      }
     
 
   });
 }

 //zapisanie edytowanych danych
 editData(){
  
  const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.userid}`);
  const data = {
    name:this.kierunki.name,
    surname:this.kierunki.surname,
    studentId:this.kierunki.studentId,
    ulica_stale:this.kierunki.ulica_stale,
    kod_stale:this.kierunki.kod_stale,
    miejsce_stale:this.kierunki.miejsce_stale,
    ulica_korespondencja:this.kierunki.ulica_korespondencja,
    kod_korespondencja:this.kierunki.kod_korespondencja,
    miejsce_korespondencja:this.kierunki.miejsce_korespondencja,
    email:this.kierunki.email,
    telefon:this.kierunki.telefon
  }
  userRef.set(data, { merge: true })
  this.openSnackBarError('Pomyślenie zaktualizowano dane użytkownika', 'X');
}

//tablice zawierające nazwy/prowadzących przedmioty
IDs: Array<any> = [];
lecturers: Array<any> = [];

//wypełnienie w/w tablic danymi dla kierunku użytkownika
getStudyAndLecturerName(){
  this.IDs = [];
  this.lecturers = [];
  var studiesCollection = this.afs.collection('nazwaKierunku').doc(this.kierunki.kierunek).collection("Semestr "+this.semestr);
  studiesCollection.snapshotChanges().forEach( a => {
    a.forEach( item => {
      const id = item.payload.doc.data().name;
      const lect = item.payload.doc.data().prowadzacy;
      this.lecturers.push(lect);
      this.IDs.push(id);

    });
  });
  this.checkIfEnrolled();
 
}

// dodawanie semestru do użytkownika
AddStudiesToUser(){
if(this.semestr>this.iloscsem || this.semestr == undefined){
  this.openSnackBarError(this.kierunki.kierunek +" przewidziane jest na "+ this.iloscsem + " semestr/y",'X');
}
else{
  if(this.zapisany == false){
  for(let i = 0;i<this.IDs.length;i++){
    const data={
      nazwa: this.IDs[i],
      prowadzacy: this.lecturers[i],
      ocena: "-"

    }
     this.afs.collection('users').doc(this.userid).collection("Semestr "+this.semestr).doc(this.IDs[i]).set(data)
     this.openSnackBarSucces('Uzytkownik ' + this.kierunki.name + ' został pomyślnie zapisany na Semestr ' + this.semestr,'X');
  }

 }
 else{
  this.openSnackBarError('Uzytkownik ' + this.kierunki.name + ' jest już zapisany na Semestr ' + this.semestr,'X');
 }
}

  
}

//usuwanie semestru z użytkownika
RemoveStudiesFromUser(){
  if(this.semestr>this.iloscsem || this.semestr == undefined){
    this.openSnackBarError(this.kierunki.kierunek +" przewidziane jest na "+ this.iloscsem + " semestr/y",'X');
  }
  else{
    if(this.zapisany == true){
     
      for(let i = 0;i<this.IDs.length;i++){
        this.afs.collection('users').doc(this.userid).collection("Semestr "+this.semestr).doc(this.IDs[i]).delete()
     }
     this.openSnackBarSucces('Uzytkownik ' + this.kierunki.name + ' został pomyslnie wypisany z semsetru ' + this.semestr,'X');
    }
   else{
    this.openSnackBarError('Uzytkownik ' + this.kierunki.name + ' nie jest zapisany na Semestr ' + this.semestr,'X');
   }
  }
  for(let i = 0;i<this.IDs.length;i++){
     this.afs.collection('users').doc(this.userid).collection("Semestr "+this.semestr).doc(this.IDs[i]).delete()
  }
}

//dialog do potwierdzenia dodania
openDialogAdd(){
  this.getSemestrQuant();
  let dialogRef = this.dialog.open(DialogsComponent,{data:{name:this.kierunki.name,kierunek:this.kierunki.kierunek,semestr:this.semestr,action:"zapisać",at:"na",from:"semestr"}});

  dialogRef.afterClosed().subscribe(result =>{
    if(result == 'true'){
      this.AddStudiesToUser();
      this.zapisany=true;
    }});
}

//dialog do potwierdzenia usunięcia
openDialogRemove(){
  this.getSemestrQuant();
  let dialogRef = this.dialog.open(DialogsComponent,{data:{name:this.kierunki.name,kierunek:this.kierunki.kierunek,semestr:this.semestr, action:"wypisać", at:"z",from:"semestru"}});

  dialogRef.afterClosed().subscribe(result =>{
    if(result == 'true'){
      this.RemoveStudiesFromUser();
      this.zapisany=false;
    }});
}
// sprawdzanie czy użytkownik ma przypisany semestr
checkIfEnrolled(){
  this.afs.collection('users').doc(this.userid).collection("Semestr "+this.semestr)
  .get().toPromise().then(result => {
    if(result.docs[0] == undefined)
    {
    this.zapisany= false;
    }
    else{
     this.zapisany=true;
    }});
}
//pobranie ilosci semestrów kierunku
getSemestrQuant(){
  this.afs.doc(`nazwaKierunku/${this.kierunki.kierunek}`).get().subscribe(ref => {
  const doc = ref.data();
  this.iloscsem = doc.ilosc_semestrow
  });
}

}
