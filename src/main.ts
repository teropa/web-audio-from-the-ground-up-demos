import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, ComponentMetadata } from '@angular/core';

import { AppComponent } from './app/app.component';
import { UnitCircleAppComponent } from './app/UnitCircleApp.component';
import { SineAnimationAppComponent } from './app/SineAnimationApp.component';
import { ControlledSineAnimationAppComponent } from './app/ControlledSineAnimationApp.component';

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

if (isPresent(AppComponent)) bootstrap(AppComponent, [provideAudioCtx]);
if (isPresent(UnitCircleAppComponent)) bootstrap(UnitCircleAppComponent, [provideAudioCtx])
if (isPresent(SineAnimationAppComponent)) bootstrap(SineAnimationAppComponent, [provideAudioCtx]);
if (isPresent(ControlledSineAnimationAppComponent)) bootstrap(ControlledSineAnimationAppComponent, [provideAudioCtx]);
