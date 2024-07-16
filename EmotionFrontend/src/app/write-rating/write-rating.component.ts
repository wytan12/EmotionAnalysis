import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-write-rating',
  templateUrl: './write-rating.component.html',
  styleUrl: './write-rating.component.css'
})
export class WriteRatingComponent {
  @Input() intensity: number | undefined;
}
