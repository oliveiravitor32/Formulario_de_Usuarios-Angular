import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
  ],
  exports: [
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class AngularMaterialModule {}
