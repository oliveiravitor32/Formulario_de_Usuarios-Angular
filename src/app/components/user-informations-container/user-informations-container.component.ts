import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { take } from 'rxjs';
import { IUser } from '../../interfaces/user/user.interface';
import { CountriesService } from '../../services/countries.service';
import { CountriesList } from '../../types/countries-list';
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

  currentTabIndex: number = 0;

  countriesList: CountriesList = [];

  private readonly _countriesService = inject(CountriesService);

  ngOnChanges(changes: SimpleChanges): void {
    const HAS_USER_SELECTED = changes['userSelected']?.currentValue;

    if (HAS_USER_SELECTED) {
      this.currentTabIndex = 0;
      this.fullFillUserForm(this.userSelected);
    }
  }

  ngOnInit(): void {
    this.getCountriesList();
  }

  private getCountriesList() {
    this._countriesService
      .getCountries()
      .pipe(take(1))
      .subscribe((countriesList) => (this.countriesList = countriesList));
  }
}
