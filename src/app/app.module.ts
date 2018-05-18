import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthProvider } from '../providers/auth/auth';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { ConexionProvider } from '../providers/conexion/conexion';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from "@ionic-native/network";

import { GooglePlus } from "@ionic-native/google-plus";
import { ApiProvider } from '../providers/api/api';
import { Connectivity } from '../providers/connectivity-service/connectivity-service';
import { GoogleMaps } from '../providers/google-maps/google-maps';

import { LocationSelect } from '../pages/location-select/location-select';

export const firebaseConfig = {
  apiKey: "AIzaSyDHcCO5ucIL6SLTmb5lgFx-MkZUj4U-jqI",
  authDomain: "servi-ecuador.firebaseapp.com",
  databaseURL: "https://servi-ecuador.firebaseio.com",
  projectId: "servi-ecuador",
  storageBucket: "servi-ecuador.appspot.com",
  messagingSenderId: "636867939821"
};

@NgModule({
  declarations: [MyApp, LocationSelect],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, LocationSelect],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    BackgroundGeolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConexionProvider,
    Geolocation,
    Network,
    GooglePlus,
    ApiProvider,
    Connectivity,
    GoogleMaps
  ]
})

export class AppModule {}
