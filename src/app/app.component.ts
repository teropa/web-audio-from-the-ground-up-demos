import { Component } from '@angular/core';
import { UnitCircleComponent } from './UnitCircle.component';

import '../../public/css/styles.css';

@Component({
  selector: 'snd-app',
  template: '<snd-unit-circle></snd-unit-circle>',
  styleUrls: ['./app.component.css'],
  directives: [UnitCircleComponent]
})
export class AppComponent { }