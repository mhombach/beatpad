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
  private soundFile: HTMLAudioElement;

  @HostBinding('class.activeDragHover') private activeDragHover: boolean;

  @HostBinding('class.soundFileLoaded') private get soundFileLoaded(): boolean {
    return this.soundFile !== undefined;
  }

  @HostListener('dragover', ['$event']) dragOver(event: any): boolean {
    return false;
  }

  @HostListener('dragenter', ['$event']) dragEnter(event: any): void {
    console.log('dragenter over ', this.name);
    this.activeDragHover = true;
  }

  @HostListener('dragleave', ['$event']) dragLeave(event: any): void {
    console.log('dragleave over ', this.name);
    this.activeDragHover = false;
  }

  @HostListener('drop', ['$event']) drop(event: any): void {
    this.activeDragHover = false;
    const data = event.dataTransfer.getData('text/plain');
    if (data) {
      this.loadSoundFile(data);
    }
  }

  get soundFileName(): string {
    if (!this.soundFile) {
      return;
    }
    const stringArr = this.soundFile.src.split('/');
    return stringArr[stringArr.length - 1];
  }

  get hasSoundFileLoaded(): boolean {
    return this.soundFile !== undefined;
  }

  constructor(private actionService: ActionService) {
    this.activeDragHover = false;
    this.isPlayingSoundFile = false;
  }

  ngOnInit(): void {
    this.actionService.registerMidiButton(this);
    this.actionService.changeLightOnMidiKey(this.noteKey, false);
  }

  loadSoundFile(soundFileName: string): void {
    this.pause();
    this.soundFile = new Audio(`../assets/${soundFileName}`);
    this.soundFile.load(); // why was it working without this???
    this.actionService.changeLightOnMidiKey(this.noteKey, true);
    this.soundFile.onended = this.soundFileHasEnded.bind(this);
  }

  unloadSoundFile(): void {
    this.soundFile.src = '';
    this.soundFile.load();
    this.soundFile = undefined;
    this.actionService.changeLightOnMidiKey(this.noteKey, false);
  }

  play(): void {
    this.pause();
    this.soundFile.play();
    this.isPlayingSoundFile = true;
    this.actionService.changeLightOnMidiKey(this.noteKey, true);
    this.blinkingMidiKeyWhileSoundFileIsPlayed();
  }

  pause(): void {
    if (this.soundFile !== undefined && !this.soundFile.ended) {
      this.soundFile.pause();
      this.soundFile.currentTime = 0;
    }
  }

  soundFileHasEnded(): void {
    this.actionService.changeLightOnMidiKey(this.noteKey, true);
    this.isPlayingSoundFile = false;
  }

  async blinkingMidiKeyWhileSoundFileIsPlayed(): Promise<void> {
    while (this.isPlayingSoundFile) {
      this.actionService.changeLightOnMidiKey(this.noteKey, false);
      await sleep(200);
      if (this.isPlayingSoundFile) {
        this.actionService.changeLightOnMidiKey(this.noteKey, true);
        await sleep(200);
      }
    }
  }
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
