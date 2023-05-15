import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ChannelContentComponent } from './channel/channel-content/channel-content.component';
import { DirectMessagesContentComponent } from './direct-message/direct-messages-content/direct-messages-content.component';
import { UserListComponent } from './user-list/user-list.component';
import { ThreadsListComponent } from './threads-list/threads-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'channel/:id',
        component: ChannelContentComponent,
      },
      {
        path: 'direct-messages/:id',
        component: DirectMessagesContentComponent,
      },
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'threads-list',
        component: ThreadsListComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
