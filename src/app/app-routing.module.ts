import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'request-reset-password',
    loadChildren: () => import('./pages/request-reset-password/request-reset-password.module').then(m => m.RequestResetPasswordPageModule)
  },
  {
    path: 'received-code-confirmation',
    loadChildren: () => import('./pages/received-code-confirmation/received-code-confirmation.module').then(m => m.ReceivedCodeConfirmationPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./pages/new-password/new-password.module').then(m => m.NewPasswordPageModule)
  },
  {
    path: 'new-user',
    loadChildren: () => import('./pages/new-user/new-user.module').then(m => m.NewUserPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
