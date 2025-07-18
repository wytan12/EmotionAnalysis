import { Component, OnInit } from '@angular/core';
import { SharedViewService} from '../services/shared-view.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-view-dropdown',
  templateUrl: './select-view-dropdown.component.html',
  styleUrl: './select-view-dropdown.component.css',
})
export class SelectViewDropdownComponent implements OnInit {
  public selectedView: string | null = null;
  public views: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private sharedViewService: SharedViewService
  ) {}

  ngOnInit(): void {
    const communityId = this.route.snapshot.paramMap.get('communityId');
    if (communityId) {
      this.sharedViewService.getViews(communityId).subscribe((views: string[]) => {
        this.views = views;
      });
    }
  }

  onChange(selectedView: string | null): void {
    this.sharedViewService.selectedView = selectedView;
    console.log(selectedView);
  }
}
