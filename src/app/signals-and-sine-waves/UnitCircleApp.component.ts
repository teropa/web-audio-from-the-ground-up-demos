import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'snd-unit-circle-app',
  template: `
    <snd-interactive-unit-circle [size]=size>
    </snd-interactive-unit-circle>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class UnitCircleAppComponent {
  size: number;

  constructor(el: ElementRef) {
    this.size = parseInt(el.nativeElement.getAttribute('size'), 10);
  }

}