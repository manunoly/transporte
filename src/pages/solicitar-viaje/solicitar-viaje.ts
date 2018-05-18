import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Loading
} from "ionic-angular";

import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { ConexionProvider } from "./../../providers/conexion/conexion";

declare var google;

@IonicPage()
@Component({
  selector: "page-solicitar-viaje",
  templateUrl: "solicitar-viaje.html"
})
export class SolicitarViajePage {
  map: any;
  loading: Loading;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // public conexion: ConexionProvider,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController
  ) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();
  }

  ionViewDidLoad() {
    this.loading = this.loadCtrl.create();
    this.loading.present();
    this.getPosition();
  }

  getPosition(): any {
    this.geolocation
      .getCurrentPosition()
      .then(response => {
        this.loadMap(response);
      })
      .catch(error => {
        console.log("No se pudo capturar la geoposicion");
        /*         if (this.conexion.online) {
          this.loadMap(new google.maps.LatLng(-0.1911519, -78.4820116));
        } else { */
        setTimeout(() => {
          // if (this.conexion.online) {
          this.loadMap(new google.maps.LatLng(-0.1911519, -78.4820116));
          // } else
          /**TODO: mostrar notif de offline o problemas para cargar el mapap */
          console.log(
            "mostrar notif de offline o problemas para cargar el mapap"
          );
          this.loading.dismiss();
        }, 2000);
        // }
        console.log("posiblemente este offline " + error);
      });
  }

  loadMap(position: Geoposition) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById("map");

    // create LatLng object
    let myLatLng = { lat: latitude, lng: longitude };

    // create map
    var map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 16,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListenerOnce(map, "idle", () => {
      console.log("mapa listo");
      this.loading.dismiss();
      mapEle.classList.add("show-map");

    });

    function actualizaCentro(env: any) {
      window.setTimeout(function() {
        console.log(env);
      }, 3000);
    }

    var inicio = new google.maps.Marker({
      position: myLatLng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Hello World!"
    });

    map.addListener("dragend", function() {
      setTimeout(() => {
        inicio.setPosition(map.getCenter());
        inicio.setAnimation(google.maps.Animation.BOUNCE)
        setTimeout(() => {
          inicio.setAnimation(google.maps.Animation.NONE)
        }, 1000);
      }, 1000);
    });
  }
}
