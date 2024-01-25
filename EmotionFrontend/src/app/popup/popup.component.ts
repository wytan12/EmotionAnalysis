import { Component, OnInit , TemplateRef, ViewChild } from '@angular/core';
import { DialogService, ModalService } from 'ng-devui/modal';
import {PopupWindowComponent} from "../popup-window/popup-window.component";
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  providers: [DialogService]
})
export class PopupComponent implements OnInit {
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

