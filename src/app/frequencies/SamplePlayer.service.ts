import { Injectable } from '@angular/core';
import { SoundPlayer } from '../common/SoundPlayer';
import { AudioService } from '../common/audio.service';

@Injectable()
export class SamplePlayer implements SoundPlayer {
  controlValueUnit = 'x';
  controlValueMin = 0.1;
  controlValueMax = 10;
  controlValueStep = 0.1;

  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode;
  private analyser: AnalyserNode;
  private playbackRate = 1;

  constructor(private audio: AudioService) {    
  }

  init(buf: AudioBuffer) {
    this.buffer = buf;
  }

  start() {
    this.source = this.audio.getBufferSource(this.buffer);
    this.source.loop = true;
    if (this.analyser) {
      this.source.connect(this.analyser);
    }
  }

  stop() {
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.source = null;
    }
  }

  analyseWith(analyser: AnalyserNode) {
    this.analyser = analyser;
    if (this.source) {
      this.source.connect(this.analyser);
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