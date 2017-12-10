import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { NoAuthGuard } from 'app/auth/no-auth-guard.service';

const verifyRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'verify_account',
    component: VerifyAccountComponent,
    canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    verifyRouting,
    SharedModule
  ],
  declarations: [
    VerifyAccountComponent
  ],
  providers: []
})
export class VerifyAccountModule {}
