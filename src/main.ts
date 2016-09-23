import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { SignalsAndSineWavesModule } from './app/signals-and-sine-waves/SignalsAndSineWaves.module';
import { FrequenciesModule } from './app/frequencies/Frequencies.module';
import { AmplitudesModule } from './app/amplitudes/Amplitudes.module';
import { AdditiveSynthesisModule } from './app/additive-synthesis/AdditiveSynthesis.module';


if (process.env.ENV === 'production') {
  enableProdMode();
}

const audioCtx = new AudioContext();
const platform = platformBrowserDynamic([{provide: 'audioCtx', useValue: audioCtx}]);

window['bootstrapSignalsAndSineWaves'] =
  () => platform.bootstrapModule(SignalsAndSineWavesModule);
window['bootstrapFrequencies'] =
  () => platform.bootstrapModule(FrequenciesModule);
window['bootstrapAmplitudes'] =
  () => platform.bootstrapModule(AmplitudesModule);
window['bootstrapAdditiveSynthesis'] =
  () => platform.bootstrapModule(AdditiveSynthesisModule);
