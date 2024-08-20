import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ProcessedData } from '../services/api.service';

@Component({
  selector: 'app-star-rating',
  templateUrl:'./star-rating.component.html' ,
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() intensity_1star: number | undefined;
  @Input() intensity_2star: number | undefined;
  @Input() intensity_3star: number | undefined;
}
