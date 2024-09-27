import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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

  private _fb = inject(FormBuilder);

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
