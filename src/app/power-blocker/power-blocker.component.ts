import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-power-blocker',
  templateUrl: './power-blocker.component.html',
  styleUrls: ['./power-blocker.component.scss'],
})
export class PowerBlockerComponent {
  show: boolean;
  initial = true;

  constructor(private player: PlayerService) {
    this.show = !player._power;
  }

  ngOnInit() {
    this.player.onPower(power => {
      this.initial = false;
      this.show = !power;
    });
  }
}
