import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '../common/Common.module';

import { HarmonicSeriesComponent } from './components/HarmonicSeries.component';
import { SineAdditionComponent } from './components/SineAddition.component';

import { HarmonicSeriesAppComponent } from './HarmonicSeriesApp.component';
import { HarmonicSeriesChordAppComponent} from './HarmonicSeriesChordApp.component';
import { HarmonicSeriesChordWithMissingFundamentalAppComponent } from './HarmonicSeriesChordWithMissingFundamentalApp.component';
import { SineAdditionTesterAppComponent } from './SineAdditionTesterApp.component';
import { SineBeatingTesterAppComponent } from './SineBeatingTesterApp.component';
import { SineCancelingTesterAppComponent } from './SineCancelingTesterApp.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [
    HarmonicSeriesComponent,
    SineAdditionComponent,
    HarmonicSeriesAppComponent,
    HarmonicSeriesChordAppComponent,
    HarmonicSeriesChordWithMissingFundamentalAppComponent,
    SineAdditionTesterAppComponent,
    SineBeatingTesterAppComponent,
    SineCancelingTesterAppComponent
  ],
  bootstrap: [
    HarmonicSeriesAppComponent,
    HarmonicSeriesChordAppComponent,
    HarmonicSeriesChordWithMissingFundamentalAppComponent,
    SineAdditionTesterAppComponent,
    SineBeatingTesterAppComponent,
    SineCancelingTesterAppComponent    
  ]
})
export class AdditiveSynthesisModule {

}