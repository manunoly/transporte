// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
// import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ApiProvider {
  items$: Observable<any[]>;
  sizeFilter$: BehaviorSubject<string|null>;
  colorFilter$: BehaviorSubject<string|null>;

  constructor(afs: AngularFirestore) {
/*     this.sizeFilter$ = new BehaviorSubject(null);
    this.colorFilter$ = new BehaviorSubject(null);

    this.items$ = combineLatest(
      this.sizeFilter$,
      this.colorFilter$
    ).pipe(
      switchMap(([size, color]) =>
        afs.collection('items', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (size) { query = query.where('size', '==', size) };
          if (color) { query = query.where('color', '==', color) };
          return query;
        }).valueChanges()
      )
    ); */
  }



}
