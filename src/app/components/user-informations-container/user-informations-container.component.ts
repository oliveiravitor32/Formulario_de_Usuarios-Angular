import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { distinctUntilChanged, Subscription, take } from 'rxjs';
import { IUser } from '../../interfaces/user/user.interface';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';
import { UserFormController } from './user-form-controller';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss',
})
export class UserInformationsContainerComponent
  extends UserFormController
  implements OnChanges, OnInit
{
  @Input({ required: true }) userSelected = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;

  @Output('onFormStatusChange') onFormStatusChangeEmitt =
    new EventEmitter<boolean>();
  @Output('onUserFormValueChanges') onUserFormValueChangesEmitt =
    new EventEmitter<void>();

  currentTabIndex: number = 0;

  countriesList: CountriesList = [];
  statesList: StatesList = [];

  userFormValueChangesSubs!: Subscription;

  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);
  private readonly _userFormRawValue = inject(UserFormRawValueService);

  ngOnInit(): void {
    this.onUserFormStatusChange();
    this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const HAS_USER_SELECTED = changes['userSelected']?.currentValue;

    if (HAS_USER_SELECTED) {
      if (this.userFormValueChangesSubs)
        this.userFormValueChangesSubs.unsubscribe();

      this.currentTabIndex = 0;
      this.fullFillUserForm(this.userSelected);

      this.onUserFormValueChanges();
      this.getStatesList(this.userSelected.country);
    }
  }

  private onUserFormValueChanges() {
    this.userFormValueChangesSubs = this.userForm.valueChanges.subscribe(() => {
      this.onUserFormValueChangesEmitt.emit();
      // Atualiza service de user-form-raw-value quando houver mudanças no formulário
      this._userFormRawValue.setUserFormRawValue(this.userForm);
    });
  }

  private onUserFormStatusChange() {
    this.userForm.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.onFormStatusChangeEmitt.emit(this.userForm.valid));
  }

  onCountrySelected(countryName: string) {
    this.getStatesList(countryName);
  }

  private getStatesList(countryName: string) {
    this._statesService
      .getStates(countryName)
      .pipe(take(1))
      .subscribe((statesList) => (this.statesList = statesList));
  }

  private getCountriesList() {
    this._countriesService
      .getCountries()
      .pipe(take(1))
      .subscribe((countriesList) => (this.countriesList = countriesList));
  }
}
