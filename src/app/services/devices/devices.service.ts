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

  constructor() {
    this.accessRequested = false;
    this.accessGranted = false;
    this.inputEvent = new Subject<number>();
    console.log('init:', this.inputEvent);
  }

  async requestAccess(): Promise<void> {
    this.accessRequested = true;
    try {
      this.midi = await window.navigator['requestMIDIAccess']();
      this.accessGranted = true;
      console.log('access-request successfull');
    } catch (error) {
      console.error('error while requesting midi-access:', error);
    }
  }

  test() {
    let out: any[] = Array.from(this.midi.outputs.values());
    console.log('midi:', out[1]);
    out[1].send([144, 0, 127]);
  }

  getListOfInputs() {
    const devices = [];
    for (const input of this.midi.inputs) {
      devices.push(input[1]);
    }
    return devices;
  }

  listenToInput() {
    console.log('listening on input:', this.selectedInputDevice.name);
    this.selectedInputDevice.onmidimessage = (event) => {
      if(event.data[2] === 127) {
        this.inputEvent.next(event.data[1]);
        console.log('midi-note:', event.data[1]);
      }
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
    console.log('new selected input:', this.selectedInputDevice);
  }
}
