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
        '0-1 means weak, 1-2 means moderate, 2-3 means strong. <br> User can hover and click on the graph points to see relevant notes.',
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
