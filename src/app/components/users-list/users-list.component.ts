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

  @Output('onUserSelected') onUserSelectedEmitter = new EventEmitter<number>();

  onUserSelected(userIndex: number) {
    this.userSelectedIndex = userIndex;
    this.onUserSelectedEmitter.emit(userIndex);
  }
}
