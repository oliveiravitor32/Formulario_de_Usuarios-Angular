import { IUserFormContactInformations } from './contact-informations.interface';
import { IUserFormDependent } from './dependent.interface';
import { IUserFormGeneralInformations } from './general-informations.interface';

export interface IUserForm {
  generalInformations: IUserFormGeneralInformations;
  contactInformations: IUserFormContactInformations;
  dependentsList: IUserFormDependent[];
}
