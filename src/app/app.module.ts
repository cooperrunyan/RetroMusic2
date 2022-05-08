import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { ScanLinesComponent } from './scan-lines/scan-lines.component';
import { ChannelComponent } from './channel/channel.component';
import { RemoteComponent } from './remote/remote.component';
import { PowerBlockerComponent } from './power-blocker/power-blocker.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, PlayerComponent, ScanLinesComponent, ChannelComponent, RemoteComponent, PowerBlockerComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:3000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
