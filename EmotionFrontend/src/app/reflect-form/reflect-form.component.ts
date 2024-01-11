import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { EmotionService } from '../services/emotion.service';

@Component({
  selector: 'app-reflect-form',
  templateUrl: './reflect-form.component.html',
  styleUrl: './reflect-form.component.css',
  animations: [
    trigger('blockTransition', [
      state('clear', style({ filter: 'blur(0)' })),
      state('blur', style({ filter: 'blur(5px)' })),
      transition('blur <=> clear', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class ReflectFormComponent {
  formData: any = {};

  activeBlockIndex: number = 0;

  constructor(private router: Router, private emotionService: EmotionService) {}

  handleButtonClick() {
    if (this.activeBlockIndex < 2) {
      this.goToNextBlock();
    } else {
      this.goToReflectHistory();
    }
  }

  getButtonLabel() {
    return this.activeBlockIndex < 2 ? 'Next' : 'Send This';
  }

  goToNextBlock() {
    this.activeBlockIndex = (this.activeBlockIndex + 1) % 3;
  }

  goToReflectHistory() {
    this.router.navigate(['reflect-history']);
  }

  submit() {
    // const formData = {
    //   GroupMembers: 'GroupMembers',
    //   Visualization: 'Visualization',
    //   Challenges: 'Challenges',
    //   ImprovementWays: 'ImprovementWays',
    //   PositivePlan: 'PositivePlan',
    //   Action: 'Action',
    // };
    console.log(this.formData);
    this.emotionService.addReg(this.formData).subscribe((EmoReadWrite) => {
      console.log(EmoReadWrite);
    });
  }
}
