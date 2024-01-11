import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: "app-scrollspy",
	templateUrl: "./scrollspy.component.html",
	styleUrls: ["./scrollspy.component.css"]
  })

export class ScrollspyComponent {
	title: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Subscribe to changes in the route parameters
    this.route.queryParams.subscribe(params => {
      // Retrieve the 'title' parameter from the query parameters
      this.title = params['title'];
    });
  }
}

