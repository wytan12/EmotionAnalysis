import { Component } from '@angular/core';
import { DialogService, ModalService } from 'ng-devui/modal';
import {PopupWindowComponent} from "../popup-window/popup-window.component";

@Component({
  selector: 'app-report-readwrite-button',
  templateUrl: './report-readwrite-button.component.html',
  styleUrl: './report-readwrite-button.component.css'
})
export class ReportReadwriteButtonComponent {
  constructor(private dialogService: DialogService) {
  }

  ngOnInit() {

  }

  openstandardDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '50%',
      maxHeight: '800px',
      title: 'Emotion Selection',
      content: PopupWindowComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [

      ],
    });
  }
}
