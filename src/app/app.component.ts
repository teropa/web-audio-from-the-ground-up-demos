import { Component } from '@angular/core';
import { InteractiveUnitCircleComponent } from './InteractiveUnitCircle.component';
import { SineAnimationComponent } from './SineAnimation.component';
import { AudioService } from './audio.service.ts';

import '../../public/css/styles.css';

@Component({
  selector: 'snd-app',
  template: `
    <snd-interactive-unit-circle [size]=200>
    </snd-interactive-unit-circle>
    <snd-sine-animation [size]=200 [frequency]=1>
    </snd-sine-animation>
  `,
  styleUrls: ['./app.component.css'],
  directives: [InteractiveUnitCircleComponent, SineAnimationComponent],
  providers: [AudioService]
})
export class AppComponent { }