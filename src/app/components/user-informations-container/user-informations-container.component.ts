import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss',
})
export class UserInformationsContainerComponent
  extends UserFormController
  implements OnChanges
{
  @Input({ required: true }) userSelected = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;

  currentTabIndex: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    const HAS_USER_SELECTED = changes['userSelected']?.currentValue;

    if (HAS_USER_SELECTED) {
      this.currentTabIndex = 0;
      this.fullFillUserForm(this.userSelected);
    }
  }
}
