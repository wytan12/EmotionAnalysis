import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-user-guide-button',
  templateUrl: './user-guide-button.component.html',
  styleUrl: './user-guide-button.component.css'
})
export class UserGuideButtonComponent {
  private notificationShown = false;

  constructor(private notification: NzNotificationService) {}

  createBasicNotification(): void {
    if (!this.notificationShown) {
      this.notification.blank(
        'TAKE NOTE',
        '0-1 means weak, 1-2 means moderate, 2-3 means strong. <br> <br> User can hover and click on the graph points to see relevant notes. <br> <br> Click on the legend. To view “reading emotions” only, click on the legend “writing” only to eliminate it. Click on the legend “writing” again to show all. <br> <br> If you see overlapping points, please select either “read” or “write” only in the legend to view more details. <br>',
        {
          nzStyle: {
            width: '600px',
            marginLeft: '-265px'
          },
          nzClass: 'test-class',
          nzDuration: 0
        }
      );
      this.notificationShown = true;
    }
  }
}
