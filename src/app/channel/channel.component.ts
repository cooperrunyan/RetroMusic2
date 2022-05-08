import { Component } from '@angular/core';
import { channels, ChannelService } from './channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent {
  channel!: number;
  show: boolean;
  interval!: ReturnType<typeof setInterval>;

  constructor(private channelService: ChannelService) {
    this.channel = channelService.current;
    this.show = false;
  }

  ngOnInit() {
    for (const channel of channels) {
      const link = document.createElement('link');

      link.href = `/assets/videos/${channel}`;
      link.rel = 'prefetch';

      document.querySelector('head')?.append(link);
    }

    this.channelService.onChange(channel => {
      this.channel = channel;
      this.show = true;

      if (this.interval) clearInterval(this.interval);

      this.interval = setTimeout(() => {
        this.show = false;
      }, 2000);
    });
  }
}
