import type { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { RoutePaths } from './constants/route-paths.enum';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { OpenConsultationsComponent } from './open-consultations/open-consultations.component';
import { InvitesComponent } from './invites/invites.component';
import { TestCallComponent } from './test-call/test-call.component';
import { ConsultationHistoryComponent } from './consultation-history/consultation-history.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AvailabilityComponent } from './pages/availability/availability.component';


import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePaths.Dashboard,
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: RoutePaths.Dashboard,
        component: DashboardComponent,
      },
      {
        path: RoutePaths.WaitingRoom,
        component: WaitingRoomComponent,
      },
      {
        path: RoutePaths.OpenConsultations,
        component: OpenConsultationsComponent,
      },
      {
        path: RoutePaths.ClosedConsultations,
        component: ConsultationHistoryComponent,
      },
      {
        path: RoutePaths.Invitations,
        component: InvitesComponent,
      },
      {
        path: RoutePaths.Test,
        component: TestCallComponent,
      },
      {
        path: RoutePaths.Profile,
        component: ProfileComponent,
      },
      { 
        path: RoutePaths.Availability,
        component: AvailabilityComponent 
      },

    ],
  },
  // Public routes
  {
    path: RoutePaths.Login,
    component: LoginComponent,
  },

];

