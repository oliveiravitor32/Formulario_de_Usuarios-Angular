import { NgModule } from '@angular/core';
import { CpfPipe } from './cpf.pipe';
import { MaritalStatusPipe } from './marital-status.pipe';
import { PhoneMaskPipe } from './phone-mask.pipe';

@NgModule({
  declarations: [MaritalStatusPipe, CpfPipe, PhoneMaskPipe],
  exports: [MaritalStatusPipe, CpfPipe, PhoneMaskPipe],
})
export class PipesModule {}
