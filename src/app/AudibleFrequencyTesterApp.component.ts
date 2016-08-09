import { Component, ElementRef } from '@angular/core';
import { AudibleFrequencyTesterComponent } from './components/AudibleFrequencyTester.component';
import { AudioService } from './audio.service';

@Component({
  selector: 'snd-audible-frequency-tester-app',
  template: `
    <snd-audible-frequency-tester>
    </snd-audible-frequency-tester>
  `,
  directives: [AudibleFrequencyTesterComponent],
  providers: [AudioService]
})
export class AudibleFrequencyTesterAppComponent {

}