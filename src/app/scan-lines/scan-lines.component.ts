import { Component, Input } from '@angular/core';
// import { RemoteService } from '../../remote.service';

@Component({
  selector: 'app-scan-lines',
  templateUrl: './scan-lines.component.html',
  styleUrls: ['./scan-lines.component.scss'],
})
export class ScanLinesComponent {
  @Input() power: boolean = true;
}
