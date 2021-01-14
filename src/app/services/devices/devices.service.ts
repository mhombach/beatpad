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
    } catch (error) {
      console.error('error while requesting midi-access:', error);
    }
  }

  getListOfInputs(): any[] {
    if (this.midi) {
      return Array.from(this.midi?.inputs.values());
    }
    return [];
  }

  private listenToInput(): void {
    if (this.selectedInputDevice) {
      this.selectedInputDevice.onmidimessage = (event) => {
        this.inputEvent.next(event.data);
      };
    }
  }

  stopListeningToInput(): void {
    if (this.selectedInputDevice) {
      this.selectedInputDevice.onmidimessage = null;
    }
  }

  getCurrentSelecteInputDevice(): any {
    return this.selectedInputDevice;
  }

  selectInputDevice(device): void {
    this.stopListeningToInput();
    this.selectedInputDevice = device;
    this.listenToInput();
    this.activateOutputDevice();
  }

  sendToOutput(data: number[]): void {
    this.selectedOutputDevice.send(data);
  }

  private activateOutputDevice(): void {
    if (this.selectedInputDevice) {
      const inputName: string = this.selectedInputDevice.name;
      for (const output of this.midi.outputs.values()) {
        if (output.name === inputName) {
          this.selectedOutputDevice = output;
          return;
        }
      }
    }
  }
}
