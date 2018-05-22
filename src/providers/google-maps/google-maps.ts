import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Connectivity } from "../connectivity-service/connectivity-service";
import { Geolocation } from "@ionic-native/geolocation";

@Injectable()
export class GoogleMaps {
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  marker: any;
  /**
   * TODO: Ver como asegurar el API_KEY
   */

  apiKey: string = "AIzaSyAoLAnxwArlEsTDMKUfQX6Twj6EqobuZpc";

  constructor(
    public connectivityService: Connectivity,
    public geolocation: Geolocation
  ) {}

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise(resolve => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {
          window["mapInit"] = () => {
            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          };

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src =
              "http://maps.google.com/maps/api/js?key=" +
              this.apiKey +
              "&callback=mapInit&libraries=places";
          } else {
            script.src = "http://maps.google.com/maps/api/js?callback=mapInit";
          }

          document.body.appendChild(script);
        }
      } else {
        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        } else {
          this.disableMap();
        }
        resolve(true);
      }

      this.addConnectivityListeners();
    });
  }
  initMap(): Promise<any> {
    this.mapInitialised = true;

    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then(position => {
        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        let mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        this.setMarker();
        resolve(true);
      });
    });
  }

  updateMarker(){
    this.marker.setPosition({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    });
    this.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      this.marker.setAnimation(google.maps.Animation.DROP);
      // this.marker.setAnimation(google.maps.Animation.NONE);
    }, 1000);
  }

  setMarker() {
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        this.map.getCenter().lat(),
        this.map.getCenter().lng()
      ),
      title: "Ubicación",
      animation: google.maps.Animation.DROP,
      map: this.map
    });

    let infowindow = new google.maps.InfoWindow({
      content: "Punto establecido"
    });

    this.marker.addListener("click", () => {
      infowindow.open(this.map, this.marker);
    });

    this.map.addListener("dragend", () => {
      this.marker.setPosition(this.map.getCenter());
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        this.marker.setAnimation(google.maps.Animation.DROP);
        // this.marker.setAnimation(google.maps.Animation.NONE);
      }, 1000);
    });
  }

  get getMarker(){
    return this.marker;
  }

  disableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }

  addConnectivityListeners(): void {
    this.connectivityService.watchOnline().subscribe(() => {
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
    });

    this.connectivityService.watchOffline().subscribe(() => {
      this.disableMap();
    });
  }
}
