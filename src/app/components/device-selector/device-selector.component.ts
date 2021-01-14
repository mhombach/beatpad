import { Component } from '@angular/core';
import { DevicesService } from 'src/app/services/devices/devices.service';

@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.scss']
})
export class DeviceSelectorComponent {

  constructor(public devicesService: DevicesService) { }

  onChange(event: Event): void {
    console.log('onChange:', event);
    this.selectNewDeviceByName((event.target as any).value);
  }

  private selectNewDeviceByName(name: string): void {
    const selectedDevice = this.devicesService.getListOfInputs().find((entry) => entry.name === name);
    this.devicesService.selectInputDevice(selectedDevice);
  }

}
