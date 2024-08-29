import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PipesModule } from '../pipes/pipes.module';
import { GeneralInformationsComponent } from './general-informations/general-informations.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserInfoItemComponent } from './user-info-item/user-info-item.component';

@NgModule({
  declarations: [UsersListComponent, GeneralInformationsComponent, UserInfoItemComponent],
  imports: [AngularMaterialModule, PipesModule],
  exports: [UsersListComponent, GeneralInformationsComponent],
})
export class ComponentsModule {}
