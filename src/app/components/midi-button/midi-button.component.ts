import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action/action.service';
@Component({
  selector: 'app-midi-button',
  templateUrl: './midi-button.component.html',
  styleUrls: ['./midi-button.component.scss']
})
export class MidiButtonComponent implements OnInit {

  @Input() name: string;
  @Input() noteKey: number;

  private isPlayingSoundFile: boolean;

  @HostBinding('class.activeDragHover') private activeDragHover: boolean;

  @HostBinding('class.soundFileLoaded') private get soundFileLoaded(): boolean {
    return this.soundFile !== undefined;
  }

  @HostListener('dragover', ['$event']) dragOver(event: any) {
    return false;
  }

  @HostListener('dragenter', ['$event']) dragEnter(event: any) {
    console.log('dragenter over ', this.name);
    this.activeDragHover = true;
  }

  @HostListener('dragleave', ['$event']) dragLeave(event: any) {
    console.log('dragleave over ', this.name);
    this.activeDragHover = false;
  }

  @HostListener('drop', ['$event']) drop(event: any) {
    this.activeDragHover = false;
    const data = event.dataTransfer.getData("text/plain");
    if (data) {
      this.loadSoundFile(data);
    }
  }

  private soundFile: HTMLAudioElement;
  
  get soundFileName(): string {
    if(!this.soundFile) {
      return;
    }
    let arr = this.soundFile.src.split('/');
    return arr[arr.length-1];
  }

  get hasSoundFileLoaded(): boolean {
    return this.soundFile !== undefined;
  }

  constructor(private actionService: ActionService) {
    this.activeDragHover = false;
    this.isPlayingSoundFile = false;
  }

  ngOnInit() {
    this.actionService.registerMidiButton(this);
    this.actionService.changeLightOnMidiKey(this.noteKey, false);
  }

  loadSoundFile(soundFileName: string) {
    this.pause();
    this.soundFile = new Audio();
    this.soundFile.src = `../assets/${soundFileName}.wav`;
    this.actionService.changeLightOnMidiKey(this.noteKey, true);
    this.soundFile.onended = this.soundFileHasEnded.bind(this);
  }

  unloadSoundFile() {
    this.soundFile.src = '';
    this.soundFile.load();
    this.soundFile = undefined;
    this.actionService.changeLightOnMidiKey(this.noteKey, false);
  }

  play() {
    this.pause();
    this.soundFile.play();
    this.isPlayingSoundFile = true;
    this.actionService.changeLightOnMidiKey(this.noteKey, true);
    this.blinkingMidiKeyWhileSoundFileIsPlayed();
  }

  pause() {
    if(this.soundFile !== undefined && !this.soundFile.ended) {
      this.soundFile.pause();
      this.soundFile.currentTime = 0;
    }
  }

  soundFileHasEnded() {
    console.log('soundfile has ENDED');
    this.actionService.changeLightOnMidiKey(this.noteKey, true);
    this.isPlayingSoundFile = false;
  }

  async blinkingMidiKeyWhileSoundFileIsPlayed() {
    while (this.isPlayingSoundFile) {
      this.actionService.changeLightOnMidiKey(this.noteKey, false);
      await sleep(200);
      if(this.isPlayingSoundFile) {
        this.actionService.changeLightOnMidiKey(this.noteKey, true);
        await sleep(200);
      }
    }
  }

}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms)); 
   

