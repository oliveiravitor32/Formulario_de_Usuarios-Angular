import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IUser } from './interfaces/user/user.interface';
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

  isInEditMode: boolean = false;
  enableSaveButton: boolean = false;
  userFormUpdated: boolean = false;

  constructor(
    private readonly _usersService: UsersService,
    private readonly _matDialog: MatDialog
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
      const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'O Formulário foi alterado',
          message:
            'Deseja realmente cancelar as alterações feitas no formulário?',
        },
      });

      dialogRef.afterClosed().subscribe((value) => {
        if (!value) return;
        this.isInEditMode = false;
        this.userFormUpdated = false;
      });
    } else {
      this.isInEditMode = false;
    }
  }

  onEditButton() {
    this.isInEditMode = true;
  }

  title = 'Formulario_de_usuarios_Reactive_forms';
}
