import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AuthProvider } from "../providers/auth/auth";
import { Geolocation } from "@ionic-native/geolocation";

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "InicioPage";

  backGeoConfig: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false // enable this to clear background location settings when the app terminates
  };

  pages: Array<{ title: string; component: any; icon: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private backgroundGeolocation: BackgroundGeolocation
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Inicio", component: "InicioPage", icon: "home" },
      {
        title: "Solicitar Viaje",
        component: "SolicitarViajePage",
        icon: "navigate"
      },{
        title: "Solicitar Encomienda",
        component: "SolicitarEncomiendaPage",
        icon: "navigate"
      },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backGroundGeolocation();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  backGroundGeolocation() {
    this.backgroundGeolocation.configure(this.backGeoConfig).subscribe(
      (location: BackgroundGeolocationResponse) => {
        console.log(location);

        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        this.backgroundGeolocation.finish(); // FOR IOS ONLY
      },
      err => {
        console.log(err);
      }
    );
  }
  isActive(page) {
    if (this.nav.getActive() && this.nav.getActive().name === page.component) {
      return "primary";
    }
    return;
  }
}
