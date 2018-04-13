import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Geolocation } from '@ionic-native/geolocation';
import { ConexionProvider } from "./../../providers/conexion/conexion";

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

var google;

export class MapaPage {
  map: any;
  mapInitialised: boolean = false;
  apiKey = "AIzaSyAoLAnxwArlEsTDMKUfQX6Twj6EqobuZpc";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conexion: ConexionProvider,
    private geolocation: Geolocation
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MapaPage");
  }

  loadGoogleMaps() {
    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {
      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.conexion.online) {
        console.log("online, loading map");

        //Load the SDK
        window["mapInit"] = () => {
          this.initMap();
          this.enableMap();
        };

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src =
            "http://maps.google.com/maps/api/js?key=" +
            this.apiKey +
            "&callback=mapInit";
        } else {
          script.src = "http://maps.google.com/maps/api/js?callback=mapInit";
        }

        document.body.appendChild(script);
      }
    } else {
      if (this.conexion.online) {
        console.log("showing map");
        this.initMap();
        this.enableMap();
      } else {
        console.log("disabling map");
        this.disableMap();
      }
    }
  }

  initMap() {
    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then(position => {
      let latLng = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    });
  }

  disableMap() {
    console.log("disable map");
  }

  enableMap() {
    console.log("enable map");
  }

  addConnectivityListeners() {
    let onOnline = () => {
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);
    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
  }
}
