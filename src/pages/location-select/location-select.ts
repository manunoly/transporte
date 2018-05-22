import { Component, ElementRef, ViewChild, NgZone } from "@angular/core";
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, Platform, ViewController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { GoogleMaps } from "../../providers/google-maps/google-maps";

import { FormControl } from "@angular/forms";
import "rxjs/add/operator/debounceTime";

// @IonicPage()
@Component({
  selector: "page-location-select",
  templateUrl: "location-select.html"
})
export class LocationSelect {
  @ViewChild("map") mapElement: ElementRef;
  @ViewChild("pleaseConnect") pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = "";
  places: any = [];
  searchDisabled: boolean = false;
  location: any;
  mensajeViaje = "Recogerme en esta posición";

  searchTerm: string = "";
  searchControl: FormControl;
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public maps: GoogleMaps,
    public platform: Platform,
    public geolocation: Geolocation,
    public viewCtrl: ViewController
  ) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(1000).subscribe(search => {
      this.searching = false;
      if (this.query.length > 2) {
        this.searchPlace();
      } else if (this.query.length < 2) {
        this.places = [];
      }
    });

    let mapLoaded = this.maps
      .init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement)
      .then(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(
          this.maps.map
        );
      });
  }

  onSearchInput() {
    this.searching = true;
  }

  selectPlace(place) {
    this.places = [];
    this.placesService.getDetails({ placeId: place.place_id }, details => {
      this.maps.map.setCenter({
        lat: details.geometry.location.lat(),
        lng: details.geometry.location.lng()
      });
      this.maps.updateMarker();
    });
  }

  searchPlace() {
    if (this.query.length > 2 && !this.searchDisabled) {
      let config = {
        componentRestrictions: { country: "ec" },
        types: ["geocode"],
        // types: ['(cities)'],
        input: this.query
      };

      this.autocompleteService.getPlacePredictions(
        config,
        (predictions, status) => {
          if (
            status == google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            this.places = [];

            predictions.forEach(prediction => {
              this.places.push(prediction);
            });
          }
        }
      );
    } else {
      this.places = [];
    }
  }

  save() {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        location: this.maps.getMarker.position
      },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            this.places = [];
            let location = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              name: results[0].formatted_address,
              geopoint: results[0].geometry.location,
              place_id: results[0].place_id
            };
          } else {
            /**TODO: mostrar mensaje  en errores
             *
             */
            console.log("no se pudo establecer el lugar");
          }
        } else {
          console.log("Geocoder failed: " + status);
        }
        this.viewCtrl.dismiss(location);
      }
    );
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
