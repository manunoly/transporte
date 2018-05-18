import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { LocationSelect } from '../location-select/location-select';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
user : any;
  constructor(public navCtrl: NavController, private auth: AuthProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
   this.user = this.auth.currentUserObservable;
   console.log(this.user);
  }

  launchLocationPage(){

    let modal = this.modalCtrl.create(LocationSelect);

    modal.onDidDismiss((location) => {
        console.log(location);
    });

    modal.present();

}

}
