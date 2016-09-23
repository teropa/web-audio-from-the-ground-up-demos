import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AudioService } from './audio.service';

import { ControlledPlayerComponent } from './components/ControlledPlayer.component';
import { CurveComponent } from './components/Curve.component';
import { OscilloscopeComponent } from './components/Oscilloscope.component';
import { SineAnimationComponent } from './components/SineAnimation.component';
import { UnitCircleComponent } from './components/UnitCircle.component';
import { XYCurveComponent } from './components/XYCurve.component';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  providers: [ AudioService ],
  declarations: [
    ControlledPlayerComponent,
    CurveComponent,
    OscilloscopeComponent,
    SineAnimationComponent,
    UnitCircleComponent,
    XYCurveComponent
  ],
  exports: [
    ControlledPlayerComponent,
    CurveComponent,
    OscilloscopeComponent,
    SineAnimationComponent,
    UnitCircleComponent,
    XYCurveComponent
  ]
})
export class CommonModule {
}