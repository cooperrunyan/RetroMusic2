import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private _current: number;
  private _onChange = new Subject<number>();

  constructor() {
    this._current = +(localStorage.getItem('current-channel') || 0);
  }

  public get current() {
    return this._current + 0;
  }

  public set current(n: number) {
    localStorage.setItem('current-channel', String(n));
    this._onChange.next(n);
    this._current = n;
  }

  public next() {
    if (channels[this.current + 1]) return this.current++;
    return (this.current = 0);
  }

  public previous() {
    if (channels[this.current - 1]) return this.current--;
    return (this.current = channels.length - 1);
  }

  public onChange(callback: (channel: number) => unknown) {
    this._onChange.subscribe(callback);
  }

  ngOnDestroy() {
    this._onChange.unsubscribe();
  }
}

export const channels = [
  'brat.mp4',
  'burnout.mp4',
  'basket-case.mp4',
  'longview.mp4',
  '2000-light-years-away.mp4',
  'at-the-library.mp4',
  '409-in-your-coffeemaker.mp4',
  'brain-stew.mp4',
  'fod.mp4',
  'geek-stink-breath.mp4',
  'going-to-pasalacqua.mp4',
  'holiday.mp4',
  'having-a-blast.mp4',
  'in-the-end.mp4',
  'private-ale.mp4',
  'one-of-my-lies.mp4',
  'she.mp4',
  'stuck-with-me.mp4',
  'when-i-come-around.mp4',
  'the-judges-daughter.mp4',
  'who-wrote-holden-caulfield.mp4',
  '86.mp4',
  'american-idiot.mp4',
  '80.mp4',
  'armatage-shanks.mp4',
  'christie-road.mp4',
  'good-riddance.mp4',
  '16.mp4',
  'disappearing-boy.mp4',
  'hitchin-a-ride.mp4',
  'only-of-you.mp4',
  'paper-lanterns.mp4',
  'pulling-teeth.mp4',
  'sassafras-roots.mp4',
  'drain-you.mp4',
  'breed.mp4',
  'come-as-you-are.mp4',
  'polly.mp4',
  'lounge-act.mp4',
  'sliver.mp4',
  'in-bloom.mp4',
  'dumb.mp4',
  'lithium.mp4',
  'about-a-girl.mp4',
  'stay-away.mp4',
  'd-7.mp4',
  'blew.mp4',
  'school.mp4',
  'negative-creep.mp4',
  'tourettes.mp4',
] as const;
