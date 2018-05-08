import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { AuthProvider } from "./../../providers/auth/auth";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  errorMsg: string;

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
    try {
      loginU
        .then(resp => {
          console.log("OK en el login");
          console.log(resp);
        })
        .catch(error => {
          console.log("error capturado en el login");
          this.errorMsg = error.message;
          setTimeout(() => {
            this.errorMsg = "";
          }, 6000);
          return;
        });
    } catch (error) {
      console.log("error capturado en el login en el try");
      this.errorMsg = error.message;
      setTimeout(() => {
        this.errorMsg = "";
      }, 6000);
    }
  }
}
