import { inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneTypeEnum } from '../../enums/phone-type.enum';
import { IUser } from '../../interfaces/user/user.interface';
import { AddressList } from '../../types/address-list';
import { DependentsList } from '../../types/dependents-list';
import { PhoneList } from '../../types/phone-list';
import { convertPtBrDateToDateObj } from '../../utils/convert-pt-br-date-to-date-obj';
import { prepareAddressList } from '../../utils/prepare-address-list';
import { preparePhoneList } from '../../utils/prepare-phone-list';
import { requiredAddressValidator } from '../../utils/user-form-validators/required-address-validator';

export class UserFormController {
  userForm!: FormGroup;

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private _fb = inject(FormBuilder);

  constructor() {
    this.createUserForm();
  }

  get generalInformations(): FormGroup {
    return this.userForm.get('generalInformations') as FormGroup;
  }

  get phoneList(): FormArray {
    return this.userForm.get('contactInformations.phoneList') as FormArray;
  }

  get addressList(): FormArray {
    return this.userForm.get('contactInformations.addressList') as FormArray;
  }

  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }

  fullFillUserForm(user: IUser) {
    this.resetUserForm();

    this.fullFillUserGeneralInformations(user);

    this.fullFillPhoneList(user.phonesList);

    this.fullFillAddressList(user.addressList);

    this.fullFillDependentsList(user.dependentsList);
  }

  private resetUserForm() {
    this.userForm.reset();

    this.generalInformations.reset();

    this.phoneList.reset();
    // .clear() remove todos os controls de um FormArray
    this.phoneList.clear();

    this.addressList.reset();
    this.addressList.clear();

    this.dependentsList.reset();
    this.dependentsList.clear();
  }

  private fullFillUserGeneralInformations(user: IUser) {
    const newUser = {
      ...user,
      birthDate: convertPtBrDateToDateObj(user.birthDate),
    };
    this.generalInformations?.patchValue(newUser);
  }

  private fullFillPhoneList(userPhoneList: PhoneList) {
    preparePhoneList(userPhoneList, false, (phone) => {
      const phoneValidators =
        phone.type === PhoneTypeEnum.EMERGENCY ? [] : [Validators.required];

      this.phoneList.push(
        this._fb.group({
          type: [phone.type],
          typeDescription: [phone.typeDescription],
          number: [phone.number, phoneValidators],
        })
      );
    });
  }

  private fullFillAddressList(userAddressList: AddressList) {
    prepareAddressList(userAddressList, false, (address) => {
      this.addressList.push(
        this._fb.group(
          {
            typeDescription: [
              { value: address.typeDescription, disabled: true },
            ],
            type: [address.type],
            street: [address.street],
            complement: [address.complement],
            country: [address.country],
            state: [address.state],
            city: [address.city],
          },
          { validators: requiredAddressValidator }
        )
      );
    });
  }

  private fullFillDependentsList(userDependentsList: DependentsList) {
    userDependentsList.forEach((dependent) => {
      this.dependentsList.push(
        this._fb.group({
          name: [dependent.name, Validators.required],
          age: [dependent.age, Validators.required],
          document: [dependent.document, Validators.required],
        })
      );
    });
  }

  private createUserForm() {
    this.userForm = this._fb.group({
      generalInformations: this._fb.group({
        name: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        country: ['', Validators.required],
        state: ['', Validators.required],
        maritalStatus: [null, Validators.required],
        monthlyIncome: [null, Validators.required],
        birthDate: [null, Validators.required],
      }),
      contactInformations: this._fb.group({
        phoneList: this._fb.array([]),
        addressList: this._fb.array([]),
      }),
      dependentsList: this._fb.array([]),
    });
  }
}
