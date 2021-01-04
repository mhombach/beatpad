import { Component } from '@angular/core';
import { DevicesService } from 'src/app/services/devices/devices.service';

@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.scss']
})
export class DeviceSelectorComponent {

  constructor(public devicesService: DevicesService) { }

}
