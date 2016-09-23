import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '../common/Common.module';

import { SineAnimationAppComponent } from './SineAnimationApp.component';
import { UnitCircleAppComponent } from './UnitCircleApp.component';

import { InteractiveUnitCircleComponent } from './components/InteractiveUnitCircle.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [
    InteractiveUnitCircleComponent,
    SineAnimationAppComponent,
    UnitCircleAppComponent
  ],
  bootstrap: [
    UnitCircleAppComponent,
    SineAnimationAppComponent
  ]
})
export class SignalsAndSineWavesModule {
}