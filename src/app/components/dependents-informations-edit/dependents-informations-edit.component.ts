import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-informations-edit',
  templateUrl: './dependents-informations-edit.component.html',
  styleUrl: './dependents-informations-edit.component.scss',
})
export class DependentsInformationsEditComponent {
  @Input({ required: true }) userForm!: FormGroup;

  @Output('onRemoveDependent') onRemoveDependentEmitt =
    new EventEmitter<number>();
  @Output('onAddDependent') onAddDependentEmitt = new EventEmitter<void>();

  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }

  addDependent() {
    this.onAddDependentEmitt.emit();
  }

  removeDependent(dependentIndex: number) {
    this.onRemoveDependentEmitt.emit(dependentIndex);
  }
}
