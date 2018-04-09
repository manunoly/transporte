import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViajesRealizadosPage } from './viajes-realizados';

@NgModule({
  declarations: [
    ViajesRealizadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ViajesRealizadosPage),
  ],
})
export class ViajesRealizadosPageModule {}
