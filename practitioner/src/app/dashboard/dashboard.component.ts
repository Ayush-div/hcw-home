import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationCardComponent } from '../components/consultations-card/consultations-card.component';
import { InviteLinkComponent } from '../components/invite-link/invite-link.component';
import { InviteFormComponent } from '../components/invite-form/invite-form.component';
import { RoutePaths } from '../constants/route-paths.enum';
import { ConsultationService } from '../services/consultations/consultation.service';
import type { Consultation } from '../models/consultations/consultation.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ConsultationCardComponent,
    InviteLinkComponent,
    InviteFormComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  readonly RoutePaths = RoutePaths;

  waitingConsultations = signal<Consultation[]>([]);
  openConsultations = signal<Consultation[]>([]);

  /** Controls the two‐step invite flow */
  isInviting = signal(false);
  selectedInviteType = signal<'remote' | 'inPerson' | null>(null);

  constructor(private consultationService: ConsultationService) {}

  ngOnInit(): void {
    this.consultationService.getWaitingConsultations().subscribe((data) => {
      this.waitingConsultations.set(data);
    });
    this.consultationService.getOpenConsultations().subscribe((data) => {
      this.openConsultations.set(data);
    });
  }

  /** Card config */
  cards = computed(() => [
    {
      title: 'WAITING ROOM',
      description: 'Consultations waiting to be attended',
      consultations: this.waitingConsultations(),
      routerLink: RoutePaths.WaitingRoom,
      showInvite: true,
    },
    {
      title: 'OPEN CONSULTATIONS',
      description: 'Consultations in progress',
      consultations: this.openConsultations(),
      routerLink: RoutePaths.OpenConsultations,
      showInvite: false,
    },
  ]);

  /** Step 1: open the invite‐link selector */
  openInviteSelector() {
    console.log('dashboard: opening invite selector');
    this.isInviting.set(true);
    this.selectedInviteType.set(null);
  }

  /** Step 2: user picked remote vs in-person */
  onTypeSelected(type: 'remote' | 'inPerson') {
    this.selectedInviteType.set(type);
  }

  /** Handle final form submission payload */
  handleInvite(payload: any) {
    console.log('Invite payload:', payload);
    // TODO: send payload to your backend/messageService here
    this.closeInvite();
  }

  /** Cancel or finish invite flow */
  closeInvite() {
    this.isInviting.set(false);
    this.selectedInviteType.set(null);
  }
}
