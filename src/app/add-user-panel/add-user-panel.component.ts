import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AuthService} from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../user.model';
import {AngularFireStorage} from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { UrlHandlingStrategy } from '@angular/router';
import { getLocaleFirstDayOfWeek } from '@angular/common';



interface typeOfStudy{
  value: string;
  viewValue: string;
}

interface group{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user-panel',
  templateUrl: './add-user-panel.component.html',
  styleUrls: ['./add-user-panel.component.css']
})


export class AddUserPanelComponent implements OnInit, AfterViewInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  kierunki: Observable<any[]>;
  IDs: Array<any> = [];
  lecturers: Array<any> = [];

  groups: group[] = [
    {value: 'nieDotyczy', viewValue: 'Nie dotyczy'},
    {value: 'I1', viewValue: 'I-1'},
    {value: 'I2', viewValue: 'I-2'},
    {value: 'E1', viewValue: 'E-1'},
    {value: 'E2', viewValue: 'E-2'},
    {value: 'R1', viewValue: 'E-2'},
    {value: 'R2', viewValue: 'E-2'}
  ];
userid;
  imie; nazwisko; numerAlbumu; pesel;
  dataUrodzenia; miejsceUrodzenia; plec; narodowosc;
  obywatelstwo; nrDowodu; imieMatki; imieOjca;

  ulica; kodPocztowy; miejscowosc;
  ulicaKorespondencja; kodPocztowyKorespondencja; miejscowoscKorespondencja;
  emailPrywatny; emailUczelnia; nrTelefonu;

  nrSwiadectwa; dataWydania;
  szkola; rokKoniecSzkoly;

  poziomDostepu; kierunek; grupa; haslo;

  photoURL;
  role;

  filePath:String

  constructor(
    private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public auth:AuthService,
    private afStorage: AngularFireStorage,
  ){}

  async addUser(){
  await this.register(this.emailUczelnia, this.haslo);
    return this.AddStudiesToUser();

  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    this.userid = user.uid; //klucz do zwyciestwa

    const data = {
      uid: user.uid,
      email_uczelnia: user.email,
      name: this.imie,
      surname: this.nazwisko,
      studentId: this.numerAlbumu,
      pesel: this.pesel,
      dataurodzenia: this.dataUrodzenia,
      miejsceurodzenia: this.miejsceUrodzenia,
      plec: this.plec,
      narodowosc: this.narodowosc,
      obywatelstwo: this.obywatelstwo,
      seria: this.nrDowodu,
      imiematki: this.imieMatki,
      imieojca: this.imieOjca,

      ulica_stale: this.ulica,
      kod_stale: this.kodPocztowy,
      miejsce_stale: this.miejscowosc,
      ulica_korespondencja: this.ulicaKorespondencja,
      kod_korespondencja: this.kodPocztowyKorespondencja,
      miejsce_korespondencja: this.miejscowoscKorespondencja,
      email: this.emailPrywatny,
      telefon: this.nrTelefonu,

      swiad_numer: this.nrSwiadectwa,
      swiad_data_wyd: this.dataWydania,
      szkola: this.szkola,
      szkola_rok: this.rokKoniecSzkoly,

      role: "student",
      kierunek: this.kierunek,
      grupa: this.grupa,
    }
   
    return userRef.set(data, { merge: true })

  }

  async register (email: string, password: string) {

    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password)
    return this.updateUserData(credential.user);
  }

  AddStudiesToUser(){
    console.log(this.userid)
    for(let i = 0;i<this.IDs.length;i++){
      const data={
        nazwa: this.IDs[i],
        prowadzacy: this.lecturers[i],
        ocena: "-"

      }
      
    this.afs.collection('users').doc(this.userid).collection('Semestr 1').doc(this.IDs[i]).set(data)
    
    }
  }

  getStudyAndLecturerName(){
    var studiesCollection = this.afs.collection('nazwaKierunku').doc(this.kierunek).collection('Semestr 1');
    studiesCollection.snapshotChanges().forEach( a => {
      a.forEach( item => {
        const id = item.payload.doc.data().name;
        const lect = item.payload.doc.data().prowadzacy;
        this.lecturers.push(lect);
        this.IDs.push(id);

      });
    });
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

    this.auth.user$.subscribe( user$ => {
      if (user$) {this.role = user$.role}
    })
  }

  ngAfterViewInit(){
    this.kierunki=this.afs.collection('nazwaKierunku').valueChanges();
  }
}
