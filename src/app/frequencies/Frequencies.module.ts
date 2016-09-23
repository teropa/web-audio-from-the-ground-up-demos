import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { CommonModule } from '../common/Common.module';

import { FreqControlledSineAnimationComponent } from './components/FreqControlledSineAnimation.component';
import { PitchFrequencyScaleComponent } from './components/PitchFrequencyScale.component';
import { ToneButtonComponent } from './components/ToneButton.component';

import { AudibleFrequencyTesterAppComponent } from './AudibleFrequencyTesterApp.component';
import { ChipmunkStretcherAppComponent } from './ChipmunkStretcherApp.component';
import { ControlledSineAnimationAppComponent } from './ControlledSineAnimationApp.component';
import { FrequencyCurveSingleRampAppComponent } from './FrequencyCurveSingleRampApp.component';
import { FrequencyCurveTwoExponentialRampsAppComponent } from './FrequencyCurveTwoExponentialRampsApp.component';
import { FrequencyCurveTwoJoinedRampsAppComponent } from './FrequencyCurveTwoJoinedRampsApp.component';
import { FrequencyCurveTwoRampsAppComponent } from './FrequencyCurveTwoRampsApp.component';
import { OctavePitchButtonsAppComponent } from './OctavePitchButtonsApp.component';
import { SingleOctavePitchButtonsAppComponent } from './SingleOctavePitchButtonsApp.component';

import { SamplePlayer } from './SamplePlayer.service';
import { SinewavePlayer } from './SinewavePlayer.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MdButtonModule,
    MdInputModule,
    CommonModule
  ],
  declarations: [
    AudibleFrequencyTesterAppComponent,
    ChipmunkStretcherAppComponent,
    ControlledSineAnimationAppComponent,
    FreqControlledSineAnimationComponent,
    FrequencyCurveSingleRampAppComponent,
    FrequencyCurveTwoExponentialRampsAppComponent,
    FrequencyCurveTwoJoinedRampsAppComponent,
    FrequencyCurveTwoRampsAppComponent,
    OctavePitchButtonsAppComponent,
    SingleOctavePitchButtonsAppComponent,
    PitchFrequencyScaleComponent,
    ToneButtonComponent
  ],
  providers: [
    SamplePlayer,
    SinewavePlayer
  ],
  bootstrap: [
    AudibleFrequencyTesterAppComponent,
    ChipmunkStretcherAppComponent,
    ControlledSineAnimationAppComponent,
    FrequencyCurveSingleRampAppComponent,
    FrequencyCurveTwoExponentialRampsAppComponent,
    FrequencyCurveTwoJoinedRampsAppComponent,
    FrequencyCurveTwoRampsAppComponent,
    OctavePitchButtonsAppComponent,
    SingleOctavePitchButtonsAppComponent
  ]
})
export class FrequenciesModule {
}