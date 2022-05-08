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
  loop: boolean;

  constructor(private player: PlayerService, private channel: ChannelService) {
    this.interval = setInterval(this.saveProgress, 1000);
    this.loop = player._loop;
  }

  get videoLink() {
    return channels[this.channel.current];
  }

  onEnd() {
    console.log('end');
    if (localStorage.getItem('loop') !== 'true') this.channel.next();
  }

  ngOnInit() {
    if (!localStorage.getItem('power')) this.player.power();
    if (!localStorage.getItem('loop')) localStorage.setItem('loop', 'false');

    this.setProgress();

    this.channel.onChange(() => (this.playing = true));
    this.channel.onChange(() => this.setProgress());

    this.player.onloop(loop => (this.loop = loop));

    ////////

    this.player.onFastforward(() => {
      (document.querySelector('video.player')! as HTMLVideoElement).currentTime += 5;
    });

    this.player.onRewind(() => {
      (document.querySelector('video.player')! as HTMLVideoElement).currentTime -= 5;
    });

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
      if (e.key === 'ArrowRight') this.player.fastforward();
      if (e.key === 'ArrowLeft') this.player.rewind();
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'm') this.player.mute();
      if (e.key === '=') this.player.volUp();
      if (e.key === '-') this.player.volDown();
      if (e.key === 'l') this.player.loop();
    });

    window.addEventListener('keydown', e => {
      if (+e.key - 1 >= 0) this.channel.current = +e.key - 1;
    });

    window.addEventListener('keyup', e => {
      this.power = !this.power;
      if (e.key === 'p') this.player.power();
    });
  }

  saveProgress() {
    localStorage.setItem('progress', String((document.querySelector('video.player') as HTMLVideoElement)?.currentTime || 0));
  }

  setProgress() {
    const duration = localStorage.getItem('progress');
    if (!duration || !+duration) return;
    (document.querySelector('video.player')! as HTMLVideoElement).currentTime = +duration;
  }

  range(size: number): ReadonlyArray<number> {
    return [...Array(size).keys()];
  }
}
