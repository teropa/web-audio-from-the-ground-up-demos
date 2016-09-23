import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, ComponentMetadata } from '@angular/core';

import { UnitCircleAppComponent } from './app/UnitCircleApp.component';
import { SineAnimationAppComponent } from './app/SineAnimationApp.component';
import { ControlledSineAnimationAppComponent } from './app/ControlledSineAnimationApp.component';
import { AudibleFrequencyTesterAppComponent } from './app/AudibleFrequencyTesterApp.component';
import { ChipmunkStretcherAppComponent } from './app/ChipmunkStretcherApp.component';
import { OctavePitchButtonsAppComponent } from './app/OctavePitchButtonsApp.component';
import { SingleOctavePitchButtonsAppComponent } from './app/SingleOctavePitchButtonsApp.component';
import { FrequencyCurveSingleRampApp } from './app/FrequencyCurveSingleRampApp.component';
import { FrequencyCurveTwoRampsApp } from './app/FrequencyCurveTwoRampsApp.component';
import { FrequencyCurveTwoJoinedRampsApp } from './app/FrequencyCurveTwoJoinedRampsApp.component';
import { FrequencyCurveTwoExponentialRampsApp } from './app/FrequencyCurveTwoExponentialRampsApp.component';
import { AmplitudeControlledSineAnimationAppComponent } from './app/AmplitudeControlledSineAnimationApp.component';
import { AudibleRangeTesterAppComponent } from './app/AudibleRangeTesterApp.component';
import { AmplitudeOverdriveTesterAppComponent } from './app/AmplitudeOverdriveTesterApp.component';
import { AmplitudeCurveDiscontinuityAppComponent } from './app/AmplitudeCurveDiscontinuityApp.component';
import { AmplitudeDecibelTesterAppComponent } from './app/AmplitudeDecibelTesterApp.component';
import { SineAdditionTesterAppComponent } from './app/SineAdditionTesterApp.component';
import { SineCancelingTesterAppComponent } from './app/SineCancelingTesterApp.component';
import { SineBeatingTesterAppComponent } from './app/SineBeatingTesterApp.component';
import { HarmonicSeriesAppComponent } from './app/HarmonicSeriesApp.component';
import { HarmonicSeriesChordAppComponent } from './app/HarmonicSeriesChordApp.component';
import { HarmonicSeriesChordWithMissingFundamentalAppComponent } from './app/HarmonicSeriesChordWithMissingFundamentalApp.component';

if (process.env.ENV === 'production') {
  enableProdMode();
}

const audioCtx = new AudioContext();
const provideAudioCtx = {provide: 'audioCtx', useValue: audioCtx};

function isPresent(component: any) {
  return Reflect.getMetadata('annotations', component)
    .filter((a: any) => a instanceof ComponentMetadata)
    .map((a: any) => a.selector)
    .filter((selector: string) => !!document.querySelector(selector))[0];
}

if (isPresent(UnitCircleAppComponent)) bootstrap(UnitCircleAppComponent, [provideAudioCtx])
if (isPresent(SineAnimationAppComponent)) bootstrap(SineAnimationAppComponent, [provideAudioCtx]);
if (isPresent(ControlledSineAnimationAppComponent)) bootstrap(ControlledSineAnimationAppComponent, [provideAudioCtx]);
if (isPresent(AudibleFrequencyTesterAppComponent)) bootstrap(AudibleFrequencyTesterAppComponent, [provideAudioCtx]);
if (isPresent(ChipmunkStretcherAppComponent)) bootstrap(ChipmunkStretcherAppComponent, [provideAudioCtx]);
if (isPresent(OctavePitchButtonsAppComponent)) bootstrap(OctavePitchButtonsAppComponent, [provideAudioCtx]);
if (isPresent(SingleOctavePitchButtonsAppComponent)) bootstrap(SingleOctavePitchButtonsAppComponent, [provideAudioCtx]);
if (isPresent(FrequencyCurveSingleRampApp)) bootstrap(FrequencyCurveSingleRampApp);
if (isPresent(FrequencyCurveTwoRampsApp)) bootstrap(FrequencyCurveTwoRampsApp);
if (isPresent(FrequencyCurveTwoJoinedRampsApp)) bootstrap(FrequencyCurveTwoJoinedRampsApp);
if (isPresent(FrequencyCurveTwoExponentialRampsApp)) bootstrap(FrequencyCurveTwoExponentialRampsApp);
if (isPresent(AmplitudeControlledSineAnimationAppComponent)) bootstrap(AmplitudeControlledSineAnimationAppComponent, [provideAudioCtx]);
if (isPresent(AudibleRangeTesterAppComponent)) bootstrap(AudibleRangeTesterAppComponent, [provideAudioCtx]);
if (isPresent(AmplitudeOverdriveTesterAppComponent)) bootstrap(AmplitudeOverdriveTesterAppComponent, [provideAudioCtx]);
if (isPresent(AmplitudeCurveDiscontinuityAppComponent)) bootstrap(AmplitudeCurveDiscontinuityAppComponent, [provideAudioCtx]);
if (isPresent(AmplitudeDecibelTesterAppComponent)) bootstrap(AmplitudeDecibelTesterAppComponent, [provideAudioCtx]);
if (isPresent(SineAdditionTesterAppComponent)) bootstrap(SineAdditionTesterAppComponent, [provideAudioCtx]);
if (isPresent(SineCancelingTesterAppComponent)) bootstrap(SineCancelingTesterAppComponent, [provideAudioCtx]);
if (isPresent(SineBeatingTesterAppComponent)) bootstrap(SineBeatingTesterAppComponent, [provideAudioCtx]);
if (isPresent(HarmonicSeriesAppComponent)) bootstrap(HarmonicSeriesAppComponent, [provideAudioCtx]);
if (isPresent(HarmonicSeriesChordAppComponent)) bootstrap(HarmonicSeriesChordAppComponent, [provideAudioCtx]);
if (isPresent(HarmonicSeriesChordWithMissingFundamentalAppComponent)) bootstrap(HarmonicSeriesChordWithMissingFundamentalAppComponent, [provideAudioCtx]);
