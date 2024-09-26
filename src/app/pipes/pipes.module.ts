import { NgModule } from '@angular/core';
import { CpfPipe } from './cpf.pipe';
import { MaritalStatusPipe } from './marital-status.pipe';
import { PhoneMaskPipe } from './phone-mask.pipe';
import { PhonePlaceholderPipe } from './phone-placeholder.pipe';

@NgModule({
  declarations: [
    MaritalStatusPipe,
    CpfPipe,
    PhoneMaskPipe,
    PhonePlaceholderPipe,
  ],
  exports: [MaritalStatusPipe, CpfPipe, PhoneMaskPipe, PhonePlaceholderPipe],
})
export class PipesModule {}
