import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reflect-history-button',
  templateUrl: './reflect-history-button.component.html',
  styleUrl: './reflect-history-button.component.css'
})
export class ReflectHistoryButtonComponent {
  constructor(private router: Router) { }

  goToReflectForm() {
    this.router.navigate(['reflect-history']);
  }
}
