import { Component, OnInit } from '@angular/core';
import { DevicesService } from "./services/devices/devices.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  audio1: HTMLAudioElement;
  audio2: HTMLAudioElement;
  
  constructor(public devicesService: DevicesService) {

  }

  ngOnInit() {
    this.devicesService.requestAccess();
  }
}
