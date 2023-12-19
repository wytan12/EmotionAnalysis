import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reflect-button',
  templateUrl: './reflect-button.component.html',
  styleUrl: './reflect-button.component.css'
})
export class ReflectButtonComponent {

  constructor(private router: Router) { }

  goToReflectForm() {
    this.router.navigate(['reflect-form']);
  }
}
