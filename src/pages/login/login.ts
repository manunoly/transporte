import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { AuthProvider } from "./../../providers/auth/auth";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login(tipo: string) {
    let loginU: any;

    switch (tipo) {
      case "google": {
        loginU = this.auth.googleLogin();
      }
      case "face": {
        loginU = this.auth.facebookLogin();
      }
      case "twitter": {
        loginU = this.auth.twitterLogin();
      }
      default: {
        loginU = this.auth.googleLogin();
      }
    }
    this.auth
      .googleLogin()
      .then(resp => {
        console.log("OK");
        console.log(resp);
      })
      .catch(error => {
        console.log("error");
        console.log(error);
      });
  }
}
