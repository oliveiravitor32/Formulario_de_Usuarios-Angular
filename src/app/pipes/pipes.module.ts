import { NgModule } from '@angular/core';
import { CpfPipe } from './cpf.pipe';
import { MaritalStatusPipe } from './marital-status.pipe';

@NgModule({
  declarations: [MaritalStatusPipe, CpfPipe],
  exports: [MaritalStatusPipe, CpfPipe],
})
export class PipesModule {}
