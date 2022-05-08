import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private pauseSubject: Subject<boolean> = new Subject();
  private playSubject: Subject<boolean> = new Subject();
  private muteSubject: Subject<boolean> = new Subject();
  private volDownSubject: Subject<boolean> = new Subject();
  private volUpSubject: Subject<boolean> = new Subject();
  private stopSubject: Subject<boolean> = new Subject();
  private powerSubject: Subject<boolean> = new Subject();

  public _power: boolean = false;

  ngOnInit() {
    if (!localStorage.getItem('power')) localStorage.setItem('power', 'true');
    this._power = localStorage.getItem('power') === 'true';
  }

  play() {
    this.playSubject.next(true);
  }
  onPlay(callback: () => unknown) {
    this.playSubject.subscribe(callback);
  }

  power() {
    this._power = !this._power;
    localStorage.setItem('power', String(this._power));
    this.powerSubject.next(this._power);
  }
  onPower(callback: (power: boolean) => unknown) {
    this.powerSubject.subscribe(callback);
  }

  pause() {
    this.pauseSubject.next(true);
  }
  onPause(callback: () => unknown) {
    this.pauseSubject.subscribe(callback);
  }

  mute() {
    this.muteSubject.next(true);
  }
  onMute(callback: () => unknown) {
    this.muteSubject.subscribe(callback);
  }

  volDown() {
    this.volDownSubject.next(true);
  }
  onVolDown(callback: () => unknown) {
    this.volDownSubject.subscribe(callback);
  }

  volUp() {
    this.volUpSubject.next(true);
  }
  onVolUp(callback: () => unknown) {
    this.volUpSubject.subscribe(callback);
  }

  stop() {
    this.stopSubject.next(true);
  }
  onStop(callback: () => unknown) {
    this.stopSubject.subscribe(callback);
  }

  ngOnDestroy() {
    this.pauseSubject.unsubscribe();
    this.playSubject.unsubscribe();
    this.muteSubject.unsubscribe();
    this.volDownSubject.unsubscribe();
    this.volUpSubject.unsubscribe();
    this.stopSubject.unsubscribe();
  }
}
