import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item { name: string; }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<Item[]>;

  constructor(public navCtrl: NavController,private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  addItem(name: string = "manuel1") {
    // Persist a document id
    const id = this.afs.createId();
    const item = { id, name };
    this.itemsCollection.doc(id).set(item);
  }

}
