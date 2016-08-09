import { Injectable } from '@angular/core';
import { SoundPlayer } from './SoundPlayer';
import { AudioService } from './audio.service';

@Injectable()
export class SamplePlayer implements SoundPlayer {
  controlValueUnit = 'x';
  controlValueMin = 0.1;
  controlValueMax = 10;
  controlValueStep = 0.1;

  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode;
  private playbackRate = 1;

  constructor(private audio: AudioService) {    
  }

  init(buf: AudioBuffer) {
    this.buffer = buf;
  }

  start() {
    this.source = this.audio.getBufferSource(this.buffer);
    this.source.loop = true;
  }

  stop() {
    if (this.source) {
      this.source.stop();
      this.source = null;
    }
  }

  get playing() {
    return !!this.source;
  }

  get controlValue() {
    return this.playbackRate;
  }

  set controlValue(c) {
    this.playbackRate = c;
    if (this.source) {
      this.source.playbackRate.value = c;
    }
  }

}