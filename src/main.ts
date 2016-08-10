import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, ComponentMetadata } from '@angular/core';

import { UnitCircleAppComponent } from './app/UnitCircleApp.component';
import { SineAnimationAppComponent } from './app/SineAnimationApp.component';
import { ControlledSineAnimationAppComponent } from './app/ControlledSineAnimationApp.component';
import { AudibleFrequencyTesterAppComponent } from './app/AudibleFrequencyTesterApp.component';
import { ChipmunkStretcherAppComponent } from './app/ChipmunkStretcherApp.component';
import { OctavePitchButtonsAppComponent } from './app/OctavePitchButtonsApp.component';
import { SingleOctavePitchButtonsAppComponent } from './app/SingleOctavePitchButtonsApp.component';

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
