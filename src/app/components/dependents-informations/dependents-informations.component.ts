import { Component, Input } from '@angular/core';
import { DependentsList } from '../../types/dependents-list';

@Component({
  selector: 'app-dependents-informations',
  templateUrl: './dependents-informations.component.html',
  styleUrl: './dependents-informations.component.scss',
})
export class DependentsInformationsComponent {
  @Input({ required: true }) dependentsList: DependentsList | undefined = [];
}
