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
import { distinctUntilChanged, take } from 'rxjs';
import { IUser } from '../../interfaces/user/user.interface';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';
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

  currentTabIndex: number = 0;

  countriesList: CountriesList = [];
  statesList: StatesList = [];

  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);

  ngOnInit(): void {
    this.onUserFormStatusChange();
    this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const HAS_USER_SELECTED = changes['userSelected']?.currentValue;

    if (HAS_USER_SELECTED) {
      this.currentTabIndex = 0;
      this.fullFillUserForm(this.userSelected);
      this.getStatesList(this.userSelected.country);
    }
  }

  onUserFormStatusChange() {
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
