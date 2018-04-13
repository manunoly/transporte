import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";

/*
  Generated class for the ConexionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConexionProvider {
  estaOnline: boolean;
  ancho: string;
  ANCHO = ["ethernet", "wifi"];

  constructor(private network: Network) {
    this.network.onConnect().subscribe(() => {
      this.estaOnline = true;
    });

    this.network.onDisconnect().subscribe(() => {
      this.estaOnline = false;
    });

    this.network.onchange().subscribe(cambio => {
      console.log(cambio);
      if (this.bandaAncha) {
        console.log("es bandaAncha");
        /**
         * TODO: lanzar evento para salvar gran cantidad de datos.
         */
      }
    });
    if (this.network.type === 'none') this.estaOnline = false;

  }

  get bandaAncha() {
    if (this.ANCHO.indexOf(this.network.type) != -1) return true;
    return false;
  }

  get online(): boolean {
    return this.estaOnline;
  }

}
