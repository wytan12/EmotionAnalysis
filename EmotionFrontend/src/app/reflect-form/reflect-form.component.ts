import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reflect-form',
  templateUrl: './reflect-form.component.html',
  styleUrl: './reflect-form.component.css'
})
export class ReflectFormComponent {

  constructor(private router: Router) { }

  goToReflectHistory() {
    this.router.navigate(['reflect-history']);
  }
}
