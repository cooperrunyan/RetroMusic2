import { Component } from '@angular/core';
import { channels, ChannelService } from '../channel/channel.service';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  playing: boolean = false;
  power: boolean = true;
  muted: boolean = localStorage.getItem('muted') === 'true' || false;
  interval!: ReturnType<typeof setInterval>;
  volume: number = 100;
  showVolume: boolean = false;
  showVolumeTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private player: PlayerService, private channel: ChannelService) {
    this.interval = setInterval(this.saveProgress(channel), 1000);
  }

  get videoLink() {
    return channels[this.channel.current];
  }

  ngOnInit() {
    this.setProgress(this.channel.current);

    this.channel.onChange(() => (this.playing = true));

    this.channel.onChange(() => {
      this.setProgress(Number(localStorage.getItem(channels[this.channel.current])));
    });

    ////////

    this.player.onPower(() => this.player.pause());

    this.player.onPause(() => {
      const videoElement = document.querySelector('video.player') as HTMLVideoElement | null;
      if (!videoElement) return;

      videoElement.pause();
    });

    this.player.onPlay(() => {
      const videoElement = document.querySelector('video.player') as HTMLVideoElement | null;
      if (!videoElement) return;
      if (!this.player._power) return;
      videoElement.play();
    });

    this.player.onMute(() => {
      this.muted = !this.muted;
      localStorage.setItem('muted', String(this.muted));
    });

    this.player.onVolUp(() => {
      if (this.volume + 10 <= 100) this.volume += 10;
      this.muted = false;
      this.showVolume = true;
      clearTimeout(this.showVolumeTimeout!);
      this.showVolumeTimeout = setTimeout(() => {
        this.showVolume = false;
        clearTimeout(this.showVolumeTimeout!);
        this.showVolumeTimeout = null;
      }, 2000);
    });

    this.player.onVolDown(() => {
      if (this.volume - 10 >= 0) this.volume -= 10;
      this.muted = false;
      this.showVolume = true;
      clearTimeout(this.showVolumeTimeout!);
      this.showVolumeTimeout = setTimeout(() => {
        this.showVolume = false;
        clearTimeout(this.showVolumeTimeout!);
        this.showVolumeTimeout = null;
      }, 2000);
    });

    ////////

    window.addEventListener('keydown', e => {
      if (e.key !== ' ') return;
      this.playing = !this.playing;

      if (this.playing === true) this.player.play();
      else this.player.pause();
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') this.channel.next();
      if (e.key === 'ArrowDown') this.channel.previous();
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'm') this.player.mute();
      if (e.key === '=') this.player.volUp();
      if (e.key === '-') this.player.volDown();
    });

    window.addEventListener('keydown', e => {
      if (+e.key - 1 >= 0) this.channel.current = +e.key - 1;
    });

    window.addEventListener('keyup', e => {
      this.power = !this.power;
      if (e.key === 'p') this.player.power();
    });
  }

  saveProgress(channel: ChannelService) {
    return () => {
      localStorage.setItem(channels[channel.current], String((document.querySelector('video.player') as HTMLVideoElement)?.currentTime || 0));
    };
  }

  setProgress(current: number) {
    const duration = localStorage.getItem(channels[current]);
    if (!duration || !+duration) return;
    (document.querySelector('video.player')! as HTMLVideoElement).currentTime = +duration;
  }

  range(size: number): ReadonlyArray<number> {
    return [...Array(size).keys()];
  }
}
