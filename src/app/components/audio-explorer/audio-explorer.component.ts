import { Component } from '@angular/core';
import * as fileList from '../../../assets/fileList.json';

@Component({
  selector: 'app-audio-explorer',
  templateUrl: './audio-explorer.component.html',
  styleUrls: ['./audio-explorer.component.scss']
})
export class AudioExplorerComponent  {

  fileList: string[];

  constructor() {
    this.fileList = (fileList as any).default;
    console.log('loaded the following files for explorer:', this.fileList);
  }

}
