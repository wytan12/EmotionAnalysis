import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

interface carouselImage{
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{

  @Input() images: carouselImage[] = []
  @Input() indicators = true;
  @Input() controls = true;

  selectedIndex = 0;
  
  title: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      // Subscribe to changes in the route parameters
    this.route.queryParams.subscribe(params => {
      // Retrieve the 'title' parameter from the query parameters
      this.title = params['title'];
    });
  }

  selectImage(index: number):void{
    this.selectedIndex = index;
  }

  OnPrevClick(): void{
    if(this.selectedIndex === 0){
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex --;
    }
  }

  OnNextClick(): void{
    if(this.selectedIndex === this.images.length - 1){
      this.selectedIndex = 0;
    } else {
      this.selectedIndex ++;
    }
  }

  


}
