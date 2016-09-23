import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '../common/Common.module';

import { AmplitudeControlledSineAnimationComponent } from './components/AmplitudeControlledSineAnimation.component';

import { AmplitudeControlledSineAnimationAppComponent } from './AmplitudeControlledSineAnimationApp.component';
import { AmplitudeCurveDiscontinuityAppComponent } from './AmplitudeCurveDiscontinuityApp.component';
import { AmplitudeDecibelTesterAppComponent } from './AmplitudeDecibelTesterApp.component';
import { AmplitudeOverdriveTesterAppComponent } from './AmplitudeOverdriveTesterApp.component';
import { AudibleRangeTesterAppComponent } from './AudibleRangeTesterApp.component';

import { SinewaveWithDecibelControlPlayer } from './SinewaveWithDecibelControlPlayer.service';
import { SinewaveWithGainPlayer } from './SinewaveWithGainPlayer.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    AmplitudeControlledSineAnimationComponent,
    AmplitudeControlledSineAnimationAppComponent,
    AmplitudeCurveDiscontinuityAppComponent,
    AmplitudeDecibelTesterAppComponent,
    AmplitudeOverdriveTesterAppComponent,
    AudibleRangeTesterAppComponent
  ],
  providers: [
    SinewaveWithDecibelControlPlayer,
    SinewaveWithGainPlayer
  ],
  bootstrap: [
    AmplitudeControlledSineAnimationAppComponent,
    AmplitudeCurveDiscontinuityAppComponent,
    AmplitudeDecibelTesterAppComponent,
    AmplitudeOverdriveTesterAppComponent,
    AudibleRangeTesterAppComponent
  ]
})
export class AmplitudesModule {
}