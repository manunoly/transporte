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

export const firebaseConfig = {
  apiKey: "AIzaSyDHcCO5ucIL6SLTmb5lgFx-MkZUj4U-jqI",
  authDomain: "servi-ecuador.firebaseapp.com",
  databaseURL: "https://servi-ecuador.firebaseio.com",
  projectId: "servi-ecuador",
  storageBucket: "servi-ecuador.appspot.com",
  messagingSenderId: "636867939821"
};

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    BackgroundGeolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConexionProvider
  ]
})

export class AppModule {}
