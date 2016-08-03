import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {
  audioCtx = new AudioContext();

  getCurrentTime() {
    return this.audioCtx.currentTime;
  }

}