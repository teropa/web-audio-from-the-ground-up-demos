import { Component, Input } from '@angular/core';
import { SineAnimationComponent } from './SineAnimation.component';

@Component({
  selector: 'snd-amplitude-controlled-sine-animation',
  template: `
    <label class="amp-control">
      <input type="range" [(ngModel)]="amplitude" min="0" max="1" step="0.1">
      <span class="lbl">{{ amplitude }}</span>
    </label>
    <snd-sine-animation [size]=size [frequency]=1 [amplitude]=amplitude>
    </snd-sine-animation>
  `,
  styles: [`
    .amp-control {
      text-align: right;
    }
    .lbl {
      display: inline-block;
      min-width: 75px;
    }
  `],
  directives: [SineAnimationComponent]
})
export class AmplitudeControlledSineAnimationComponent {
  @Input() size: number;
  amplitude: number = 1;
}