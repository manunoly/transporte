import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitarViajePage } from './solicitar-viaje';

@NgModule({
  declarations: [
    SolicitarViajePage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitarViajePage),
  ],
})
export class SolicitarViajePageModule {}
