import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUserForm } from '../interfaces/user-form/user-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFormRawValueService {
  userFormRawValue: IUserForm = {} as IUserForm;

  constructor() {}

  getUserFormRawValue() {
    return this.userFormRawValue;
  }

  setUserFormRawValue(userForm: FormGroup<any>) {
    this.userFormRawValue = userForm.getRawValue();
  }
}
