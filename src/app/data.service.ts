import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  charts: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { 
    this.charts = this.db.list('horizontals_1').valueChanges();
  }

  getCharts() : Observable<any[]> {
    return this.charts;
  }
}