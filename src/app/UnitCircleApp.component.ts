import { Component, ElementRef } from '@angular/core';
import { InteractiveUnitCircleComponent } from './components/InteractiveUnitCircle.component';

@Component({
  selector: 'snd-unit-circle-app',
  template: `
    <snd-interactive-unit-circle [size]=size>
    </snd-interactive-unit-circle>
  `,
  directives: [InteractiveUnitCircleComponent]
})
export class UnitCircleAppComponent {
  size: number;

  constructor(el: ElementRef) {
    this.size = parseInt(el.nativeElement.getAttribute('size'), 10);
  }

}