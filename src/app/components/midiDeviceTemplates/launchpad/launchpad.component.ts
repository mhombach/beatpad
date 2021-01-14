import { Component } from '@angular/core';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent {

  generateGridAreaName(keyId: number, number1: number, number2: number = 0): string {
    return `n${keyId}_${number1 + number2}`;
  }

}
