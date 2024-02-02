import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  templateUrl:'./star-rating.component.html' ,
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() intensity: number | undefined;
}
