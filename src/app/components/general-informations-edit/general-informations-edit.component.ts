import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss',
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
  @Input({ required: true }) userForm!: FormGroup;
  @Input({ required: true }) countriesList: CountriesList = [];
  @Input({ required: true }) statesList: StatesList = [];

  @Output('onCountrySelected') onCountrySelectedEmitt =
    new EventEmitter<string>();

  countriesListFiltered: CountriesList = [];
  statesListFiltered: StatesList = [];

  ngOnInit(): void {
    this.watchCountryFormChangesAndFilter();
    this.watchStateFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['countriesList']?.currentValue) {
      this.countriesListFiltered = this.countriesList;
    }
    if (changes['statesList']?.currentValue) {
      this.statesListFiltered = this.statesList;
    }
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }

  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  get stateControl(): FormControl {
    return this.userForm.get('generalInformations.state') as FormControl;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    this.onCountrySelectedEmitt.emit(event.option.value);
  }

  private watchCountryFormChangesAndFilter() {
    this.countryControl.valueChanges.subscribe(
      this.filterCountriesList.bind(this)
    );
  }

  private filterCountriesList(searchTerm: string) {
    this.countriesListFiltered = this.countriesList.filter((country) =>
      country.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase().trim())
    );
  }

  private watchStateFormChangesAndFilter() {
    this.stateControl.valueChanges.subscribe(this.filterStatesList.bind(this));
  }

  private filterStatesList(searchTerm: string) {
    this.statesListFiltered = this.statesList.filter((state) =>
      state.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase().trim())
    );
  }
}
