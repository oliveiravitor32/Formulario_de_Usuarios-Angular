import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IDialogConfirmationData } from './interfaces/dialog-confirmation-data.interface';
import { IUser } from './interfaces/user/user.interface';
import { UpdateUserService } from './services/update-user.service';
import { UserFormRawValueService } from './services/user-form-raw-value.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { convertUserFormToUser } from './utils/convert-user-form-to-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Formulario_de_usuarios_Reactive_forms';
  usersList: UsersListResponse = [];

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;

  isInEditMode: boolean = false;
  enableSaveButton: boolean = false;
  userFormUpdated: boolean = false;

  constructor(
    private readonly _usersService: UsersService,
    private readonly _matDialog: MatDialog,
    private readonly _updateUserService: UpdateUserService,
    private readonly _userFormRawValue: UserFormRawValueService
  ) {}

  ngOnInit(): void {
    this._usersService
      .getUsers()
      .pipe(take(1))
      .subscribe((usersListResponse) => (this.usersList = usersListResponse));
  }

  onUserSelected(userSelectedIndex: number) {
    const userFound = this.usersList[userSelectedIndex];

    if (userFound) {
      this.userSelectedIndex = userSelectedIndex;
      this.userSelected = userFound;
    }
  }

  onFormStatusChange(formStatus: boolean) {
    // Solução para exceção ExpressionChangedAfterItHasBeenCheckedError com setTimeOut().
    // Faz com que a atribuição seja feita de forma assíncrona e não dê conflito com a última checagem de valor do Angular.
    setTimeout(() => (this.enableSaveButton = formStatus), 0);
  }

  onUserFormValueChanges() {
    this.userFormUpdated = true;
  }

  onCancelButton() {
    if (this.userFormUpdated) {
      const data: IDialogConfirmationData = {
        title: 'O Formulário foi alterado',
        message:
          'Deseja realmente cancelar as alterações feitas no formulário?',
      };

      this.openConfirmationDialog(data, (value) => {
        if (!value) return;
        this.isInEditMode = false;
        this.userFormUpdated = false;
      });
    } else {
      this.isInEditMode = false;
    }
  }

  onEditButton() {
    this.userSelected = structuredClone(this.userSelected);
    this.isInEditMode = true;
  }

  onSaveButton() {
    if (this.userFormUpdated) {
      const data: IDialogConfirmationData = {
        title: 'Confirmar alteração de dados',
        message: 'Deseja realmente salvar os valores alterados?',
      };
      this.openConfirmationDialog(data, (value) => {
        if (!value) return;
        this.isInEditMode = false;
        this.userFormUpdated = false;
        this.saveUserInfos();
      });
    }
  }

  private openConfirmationDialog(
    data: IDialogConfirmationData,
    callback: (value: boolean) => void
  ) {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(callback);
  }

  private saveUserInfos() {
    const newUser = convertUserFormToUser(
      this._userFormRawValue.getUserFormRawValue()
    );

    this._updateUserService
      .updateUser(newUser)
      .subscribe((newUserResponse: IUser) => {
        if (this.userSelectedIndex === undefined) return;

        this.usersList[this.userSelectedIndex] = newUserResponse;
        this.userSelected = structuredClone(newUserResponse);
      });
  }
}
