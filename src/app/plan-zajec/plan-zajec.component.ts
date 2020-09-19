import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthService} from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-plan-zajec',
  templateUrl: './plan-zajec.component.html',
  styleUrls: ['./plan-zajec.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class PlanZajecComponent implements AfterViewInit {
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(private afs: AngularFirestore, public auth:AuthService, private datePipe: DatePipe) { }
  currentDate = new Date();
  currentFilter: string;
  grupa:string;
  pickerFilter:string;;
  displayedColumns=['Data','Godzina','Nazwa','Sala','Wykladowca']
  dataSource: MatTableDataSource<any>;
  imieNazwisko:string;

  //wczytanie planu dla wybranej daty

  ngAfterViewInit(): void {
    this.auth.user$.subscribe( user$ => {
      if (user$) { this.grupa = user$.grupa,this.imieNazwisko = user$.imieNazwisko }

      if(this.imieNazwisko != undefined){

        this.afs.collection('plan').doc('planWykladowcow').collection(this.imieNazwisko).valueChanges().subscribe(data =>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          const sortState: Sort = {active: 'godzina', direction: 'asc'};
          this.sort.active = sortState.active;
          this.sort.direction = sortState.direction;
          this.currentFilter = this.datePipe.transform(this.currentDate, 'dd.MM.yyyy');
          this.applyFilter(this.currentFilter);
        });
      }
      else {
          this.afs.collection('plan').doc(this.grupa).collection('zajecia').valueChanges().subscribe(data =>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          const sortState: Sort = {active: 'godzina', direction: 'asc'};
          this.sort.active = sortState.active;
          this.sort.direction = sortState.direction;
          this.currentFilter = this.datePipe.transform(this.currentDate, 'dd.MM.yyyy');
          this.applyFilter(this.currentFilter);
        });
      }
      

       
      });
    }

    applyFilter(filterValue: any){
      this.dataSource.filter = filterValue;
    }

    dateChangeFilter(filterValue:any){
    this.pickerFilter= this.datePipe.transform(filterValue,'dd.MM.yyyy')
    this.dataSource.filter = this.pickerFilter;
  }  
}