import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss',
})
export class UserInformationsContainerComponent implements OnChanges {
  @Input({ required: true }) userSelected = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;

  currentTabIndex: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userSelected']?.currentValue) {
      this.currentTabIndex = 0;
    }
  }
}
