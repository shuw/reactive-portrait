'use strict'

export default class InteractionController {
  constructor(portrait) {
    this.portrait = portrait;
    window.setInterval(this.tick, 25);
  }

  tick() {
    
  }

  onMouseEnter() {
    console.log("mouseEnter");
  }
}