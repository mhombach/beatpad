import { Injectable } from '@angular/core';
import { MidiButtonComponent } from 'src/app/components/midi-button/midi-button.component';
import { DevicesService } from '../devices/devices.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  
  keyMap: Map<number, MidiButtonComponent>;

  constructor(private devicesService: DevicesService) {
    this.keyMap = new Map<number, MidiButtonComponent>();
    this.devicesService.inputEvent.subscribe(this.inputEvent.bind(this));
  }

  inputEvent(event: any) {
    console.log('actionservice -> inputEvent:', event);
    const keyPressDown: boolean = event[2] === 127;
    if(!keyPressDown) {
      return;
    }
    const noteKey: number = event[1];
    const midiButtonComponent: MidiButtonComponent = this.keyMap.get(noteKey);
    if(!midiButtonComponent) {
      console.warn('key was pressed that was not mapped');
      return;
    }
    if(midiButtonComponent.hasSoundFileLoaded) {
      console.log('calling on OBJECT:', midiButtonComponent);
      midiButtonComponent.play.call(midiButtonComponent);
    }
  }

  registerMidiButton(midiButton: MidiButtonComponent) {
    this.keyMap.set(midiButton.noteKey, midiButton);
    console.log(`registered ${midiButton.name} midiButton`);
  }

  changeLightOnMidiKey(noteKey: number, on: boolean) {
    const STATIC_NUMBER: number = 144;
    const statusNumber: number = on ? 127 : 0;
    const data: number[] = [STATIC_NUMBER, noteKey, statusNumber];
    this.devicesService.sendToOutput(data);
  }
}
