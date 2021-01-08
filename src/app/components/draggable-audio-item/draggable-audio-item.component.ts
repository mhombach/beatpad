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

  @HostListener('dragstart', ['$event']) dragStart(event) {
    console.log('DraggableAudioItemComponent -> dragStart');
    event.dataTransfer.setData('text/plain', this.value)
  } 

  constructor() { }

}
