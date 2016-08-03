import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppComponent } from './app/app.component';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, []);




let audioContext = new AudioContext();
let sineBuffer = audioContext.createBuffer(1, 88200, 44100);
let sineArray = sineBuffer.getChannelData(0);
let frequency = 440;
let radiansPerSecond = frequency * 2 * Math.PI;
for (let n=0 ; n < 88200 ; n++) {
  let radians = radiansPerSecond * (n / 44100);
  sineArray[n] = Math.sin(n * 0.0627);
}

let src = audioContext.createBufferSource();
src.buffer = sineBuffer;
src.connect(audioContext.destination);
src.start();

let osc = audioContext.createOscillator();
osc.frequency.value = 440;
osc.connect(audioContext.destination);
osc.start(audioContext.currentTime + 3);
osc.stop(audioContext.currentTime + 5);
