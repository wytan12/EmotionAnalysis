import { Component, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @Input() backgroundColor: ThemePalette;
}

