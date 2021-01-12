import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DeviceSelectorComponent } from './components/device-selector/device-selector.component';
import { MidiButtonComponent } from './components/midi-button/midi-button.component';
import { DraggableAudioItemComponent } from './components/draggable-audio-item/draggable-audio-item.component';
import { AudioExplorerComponent } from './components/audio-explorer/audio-explorer.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceSelectorComponent,
    MidiButtonComponent,
    DraggableAudioItemComponent,
    AudioExplorerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
