import { Component } from '@angular/core';
import { InteractiveUnitCircleComponent } from './InteractiveUnitCircle.component';
import { AnimatedUnitCircleComponent } from './AnimatedUnitCircle.component';

import '../../public/css/styles.css';

@Component({
  selector: 'snd-app',
  template: `
    <snd-interactive-unit-circle [size]=200>
    </snd-interactive-unit-circle>
    <snd-animated-unit-circle [size]=200>
    </snd-animated-unit-circle>
  `,
  styleUrls: ['./app.component.css'],
  directives: [InteractiveUnitCircleComponent, AnimatedUnitCircleComponent]
})
export class AppComponent { }