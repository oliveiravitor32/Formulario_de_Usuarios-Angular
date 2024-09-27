import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogConfirmationData } from '../../interfaces/dialog-confirmation-data.interface';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  _data: IDialogConfirmationData = inject(MAT_DIALOG_DATA);
}
