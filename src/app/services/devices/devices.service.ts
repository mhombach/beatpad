import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  accessRequested: boolean;
  accessGranted: boolean;
  inputEvent: Subject<number>;

  private midi: any;
  private selectedInputDevice: any;
  private selectedOutputDevice: any;

  constructor() {
    this.accessRequested = false;
    this.accessGranted = false;
    this.inputEvent = new Subject<number>();
  }

  async requestAccess(): Promise<void> {
    this.accessRequested = true;
    try {
      this.midi = await window.navigator['requestMIDIAccess']();
      this.accessGranted = true;
      console.log('access-request successfull:', this.midi);
      console.log('outputs:', Array.from(this.midi.outputs.values()));
      console.log('inputs:', Array.from(this.midi.inputs.values()));


    } catch (error) {
      console.error('error while requesting midi-access:', error);
    }
  }

  /*test_LED_Output() {
    let out: any[] = Array.from(this.midi.outputs.values());
    console.log('midi:', out[0]);
    out[1].send([144, 0, 127]);
  }*/

  getListOfInputs() {
    return Array.from(this.midi.inputs.values());
  }

  private listenToInput() {
    this.selectedInputDevice.onmidimessage = (event) => {
      this.inputEvent.next(event.data);
    }
  }

  stopListeningToInput() {
    if(this.selectedInputDevice) {
      this.selectedInputDevice.onmidimessage = null;
    }
  }

  getCurrentSelecteInputDevice() {
    return this.selectedInputDevice;
  }

  selectInputDevice(device) {
    this.stopListeningToInput();
    this.selectedInputDevice = device;
    this.listenToInput();
    this.activateOutputDevice();
  }

  sendToOutput(data: number[]) {
    this.selectedOutputDevice.send(data);
  }

  private activateOutputDevice() {
    const inputName: string = this.selectedInputDevice.name;
    for (const output of this.midi.outputs.values()) {
      console.log('output arr found:', output);
      if(output.name === inputName) {
        console.log('output arr found same name:', inputName);
        this.selectedOutputDevice = output;
        return;
      }
    }
  }
}
