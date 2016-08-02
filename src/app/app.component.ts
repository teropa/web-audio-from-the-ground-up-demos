import { Component } from '@angular/core';
import { InteractiveUnitCircleComponent } from './InteractiveUnitCircle.component';

import '../../public/css/styles.css';

@Component({
  selector: 'snd-app',
  template: '<snd-interactive-unit-circle [size]=200></snd-interactive-unit-circle>',
  styleUrls: ['./app.component.css'],
  directives: [InteractiveUnitCircleComponent]
})
export class AppComponent { }