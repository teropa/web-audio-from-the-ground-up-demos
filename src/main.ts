import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppComponent } from './app/app.component';
import { UnitCircleAppComponent } from './app/UnitCircleApp.component';
import { SineAnimationAppComponent } from './app/SineAnimationApp.component';
import { ControlledSineAnimationAppComponent } from './app/ControlledSineAnimationApp.component';

if (process.env.ENV === 'production') {
  enableProdMode();
}

const audioCtx = new AudioContext();


bootstrap(AppComponent, [
  {provide: AudioContext, useValue: audioCtx}
]);
bootstrap(UnitCircleAppComponent, [
  {provide: AudioContext, useValue: audioCtx}
]);
bootstrap(SineAnimationAppComponent, [
  {provide: AudioContext, useValue: audioCtx}
]);
bootstrap(ControlledSineAnimationAppComponent, [
  {provide: AudioContext, useValue: audioCtx}
]);