import { Component } from '@angular/core';
import { DevicesService } from "./services/devices/devices.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  audio1: HTMLAudioElement;
  audio2: HTMLAudioElement;
  
  constructor(public devicesService: DevicesService) {
    //this.audio1 = new Audio();
    //this.audio1.src = '../assets/test1.wav';
    //this.audio2 = new Audio();
    //this.audio2.src = '../assets/test2.wav';
    /*this.devicesService.inputEvent.subscribe((event) => {
      if(event === 0) {
        this.playAudio1();
      } else if(event === 1) {
        this.playAudio2();
      }
    });*/
  }

  drop(event: any) {
    console.log(123);
  }

  /*loadAudio() {
    console.log('load');
    this.audio1.load();
    console.log('load 1 finished');
    this.audio2.load();
    console.log('load 2 finished');
  }*/

  /*playAudio1() {
    console.log('play 1');
    this.audio1.pause();
    this.audio1.currentTime = 0;
    this.audio1.play();
  }

  playAudio2() {
    console.log('play 2');
    this.audio2.pause();
    this.audio2.currentTime = 0;
    this.audio2.play();
  }*/
}
