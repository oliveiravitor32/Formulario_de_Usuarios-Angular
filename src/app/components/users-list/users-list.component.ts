import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListResponse } from '../../types/users-list-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  userSelectedIndex: number | undefined;

  @Input({ required: true }) usersList: UsersListResponse =
    {} as UsersListResponse;
  @Input({ required: true }) isInEditMode: boolean = false;

  @Output('onUserSelected')
  onUserSelectedEmitt = new EventEmitter<number>();

  onUserSelected(userIndex: number) {
    // Não deixa selecionar usuário se o modo de edição estiver ativo!
    if (this.isInEditMode) return;

    this.userSelectedIndex = userIndex;
    this.onUserSelectedEmitt.emit(userIndex);
  }
}
