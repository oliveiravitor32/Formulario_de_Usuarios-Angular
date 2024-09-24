import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss',
})
export class GeneralInformationsEditComponent {
  @Input({ required: true }) user: IUser = {} as IUser;
}
