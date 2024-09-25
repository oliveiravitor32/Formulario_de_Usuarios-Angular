import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PipesModule } from '../pipes/pipes.module';
import { ButtonsContainerComponent } from './buttons-container/buttons-container.component';
import { AddressListEditComponent } from './contact-informations-edit/address-list-edit/address-list-edit.component';
import { ContactInformationsEditComponent } from './contact-informations-edit/contact-informations-edit.component';
import { PhoneListEditComponent } from './contact-informations-edit/phone-list-edit/phone-list-edit.component';
import { AddressListComponent } from './contact-informations/address-list/address-list.component';
import { ContactInformationsComponent } from './contact-informations/contact-informations.component';
import { PhoneListComponent } from './contact-informations/phone-list/phone-list.component';
import { DependentsInformationsEditComponent } from './dependents-informations-edit/dependents-informations-edit.component';
import { DependentsInformationsComponent } from './dependents-informations/dependents-informations.component';
import { GeneralInformationsEditComponent } from './general-informations-edit/general-informations-edit.component';
import { GeneralInformationsComponent } from './general-informations/general-informations.component';
import { UserInfoItemComponent } from './user-info-item/user-info-item.component';
import { UserInformationsContainerComponent } from './user-informations-container/user-informations-container.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [
    UsersListComponent,
    GeneralInformationsComponent,
    UserInfoItemComponent,
    ContactInformationsComponent,
    PhoneListComponent,
    AddressListComponent,
    DependentsInformationsComponent,
    ButtonsContainerComponent,
    UserInformationsContainerComponent,
    GeneralInformationsEditComponent,
    ContactInformationsEditComponent,
    PhoneListEditComponent,
    AddressListEditComponent,
    DependentsInformationsEditComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PipesModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  exports: [
    UsersListComponent,
    ButtonsContainerComponent,
    UserInformationsContainerComponent,
  ],
  providers: [provideNgxMask()],
})
export class ComponentsModule {}
