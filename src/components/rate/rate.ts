import { Component } from '@angular/core';

/**
 * Generated class for the RateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rate',
  templateUrl: 'rate.html'
})
export class RateComponent {

  text: string;

  constructor() {
    console.log('Hello RateComponent Component');
    this.text = 'Hello World';
  }

}
