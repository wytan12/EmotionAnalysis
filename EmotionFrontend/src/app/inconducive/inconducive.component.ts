import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inconducive',
  templateUrl: './inconducive.component.html',
  styleUrls: ['./inconducive.component.css']
})
export class InconduciveComponent {
  constructor(private router: Router) { }

  navigate() {
    this.router.navigate(['survey']);
  }

}
