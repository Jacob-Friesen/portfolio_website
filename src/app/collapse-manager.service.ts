import { Injectable } from '@angular/core';

@Injectable()
export class CollapseManagerService {

  openIndex: Number;

  constructor() {
    this.openIndex = 0;
  }

  toggle(index) {
    if (index === this.openIndex) {
      this.openIndex = -1;
    } else {
      this.openIndex = index;
    }
  }
}
