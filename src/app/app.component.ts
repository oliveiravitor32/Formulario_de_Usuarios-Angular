import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';
import { CitiesService } from './services/cities.service';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  usersList: UsersListResponse = [];

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;

  currentTabIndex: number = 2;

  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService
  ) {}

  onUserSelected(userSelectedIndex: number) {
    const userFound = this.usersList[userSelectedIndex];

    if (userFound) {
      this.userSelectedIndex = userSelectedIndex;
      this.userSelected = userFound;
      this.currentTabIndex = 0;
    }
  }

  ngOnInit(): void {
    // this._countriesService
    //   .getCountries()
    //   .subscribe((countriesResponse) =>
    //     console.log('countriesResponse', countriesResponse)
    //   );

    // this._statesService
    //   .getStates('Brazil')
    //   .subscribe((statesResponse) =>
    //     console.log('statesResponse', statesResponse)
    //   );

    // this._citiesService
    //   .getCities('Brazil', 'São Paulo')
    //   .subscribe((citiesResponse) =>
    //     console.log('citiesResponse', citiesResponse)
    //   );

    this._usersService
      .getUsers()
      .pipe(take(1))
      .subscribe((usersListResponse) => (this.usersList = usersListResponse));
  }

  title = 'Formulario_de_usuarios_Reactive_forms';
}
