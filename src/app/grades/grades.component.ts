import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements AfterViewInit, OnInit {

  @ViewChild(MatSort) sort: MatSort;

  constructor(private afs: AngularFirestore,public auth:AuthService) { }

  semestry = [
    {value: 'Semestr 1'},
    {value: 'Semestr 2'},
    {value: 'Semestr 3'},
    {value: 'Semestr 4'},
    {value: 'Semestr 5'},
    {value: 'Semestr 6'},
    {value: 'Semestr 7'},

  ];
  displayedColumns=['Nazwa','Prowadzacy','Ocena']
  dataSource: MatTableDataSource<any>;
  userid;
  nrsem = "Semestr 1"
  role;

  ngAfterViewInit(): void {
   this.showGrades();
  }

  ngOnInit(): void{
    this.auth.user$.subscribe( user$ => {
      if (user$) {this.role = user$.role}
    })
  }

  showGrades(){ 
    this.auth.user$.subscribe( user$ => {
      if (user$) { this.userid = user$.uid }
      
      this.afs.collection('users').doc(this.userid).collection(this.nrsem).valueChanges().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        const sortState: Sort = {active: 'nazwa', direction: 'asc'};
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;

      });
    });
    
  }


}
