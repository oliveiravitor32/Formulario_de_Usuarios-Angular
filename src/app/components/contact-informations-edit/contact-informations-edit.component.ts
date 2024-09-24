import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-contact-informations-edit',
  templateUrl: './contact-informations-edit.component.html',
  styleUrl: './contact-informations-edit.component.scss',
})
export class ContactInformationsEditComponent {
  @Input({ required: true }) user: IUser = {} as IUser;
}
