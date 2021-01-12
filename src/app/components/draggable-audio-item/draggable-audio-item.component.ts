import { Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-draggable-audio-item',
  templateUrl: './draggable-audio-item.component.html',
  styleUrls: ['./draggable-audio-item.component.scss']
})
export class DraggableAudioItemComponent {

  @HostBinding('attr.draggable') private draggable: boolean = true;

  @Input() name: string;
  @Input() value: any;

  currentlyPreviewing: boolean;
  cached: boolean;

  private soundFile: HTMLAudioElement;

  @HostListener('dragstart', ['$event']) dragStart(event) {
    console.log('DraggableAudioItemComponent -> dragStart');
    event.dataTransfer.setData('text/plain', this.value)
  }

  constructor() {
    this.currentlyPreviewing = false;
    this.cached = false;
  }

  play() {
    this.currentlyPreviewing = true;
    let soundFile = new Audio(`../assets/${this.value}`);
    this.soundFile = soundFile;
    soundFile.load();
    this.cached = true;
    soundFile.play();
    soundFile.onended = () => {
      console.log('onended was called');
      this.currentlyPreviewing = false;
    }
    soundFile.onpause = () => {
      console.log('onpause was called');
      this.currentlyPreviewing = false;
    }
  }

  stop() {
    this.soundFile.pause();
    this.soundFile.currentTime = 0;
  }

}
