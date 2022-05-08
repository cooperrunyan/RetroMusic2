import { Component } from '@angular/core';
import { ChannelService } from '../channel/channel.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss'],
})
export class RemoteComponent {
  constructor(private channel: ChannelService, private player: PlayerService) {}

  channelUp() {
    this.channel.next();
  }

  channelDown() {
    this.channel.previous();
  }

  volumeUp() {
    this.player.volUp();
  }

  volumeDown() {
    this.player.volDown();
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  mute() {
    this.player.mute();
  }

  power() {
    this.player.power();
  }

  fastforward() {
    this.player.fastforward();
  }

  rewind() {
    this.player.rewind();
  }

  loop() {
    this.player.loop();
  }

  setChannel(number: number) {
    this.channel.current = number;
  }
}
