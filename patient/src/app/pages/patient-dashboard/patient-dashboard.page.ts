import { CardComponentComponent } from 'src/app/components/card-component/card-component.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  videocamOutline, starOutline,
  calendarOutline, checkmarkCircle 
} from 'ionicons/icons';
import { Consultation, ConsultationService } from 'src/app/services/consultation.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './patient-dashboard.page.html',
  styleUrls: ['./patient-dashboard.page.scss'],
  standalone: true,
  imports: [
    CardComponentComponent,
    HeaderComponent,
    CommonModule,
    IonContent
  ],
})

export class PatientDashboard implements OnInit{
  consultations: Consultation[] = [];
  activeConsultations: Consultation[] = [];
  completedConsultations: Consultation[] = [];
  upcomingConsultations: Consultation[] = [];

  constructor(
    private consultationService: ConsultationService
  ){
    addIcons({
      videocamOutline, 
      starOutline, 
      calendarOutline,
      checkmarkCircle
    });
  }
  ngOnInit() {
    const patientId = 123; // Replace this with the actual logged-in patient's ID

    this.consultationService.getPatientConsultationHistory(patientId).subscribe({
      next: (res: any) => {
        this.consultations = res.data;
        const now = new Date();

        // ACTIVE
        this.activeConsultations = this.consultations.filter(c =>
          ['ACTIVE', 'WAITING'].includes(c.status)
        );

        // UPCOMING
        this.upcomingConsultations = this.consultations.filter(c =>
          new Date(c.scheduledDate) > now && c.status === 'SCHEDULED'
        );

        // PAST
        this.completedConsultations = this.consultations.filter(c =>
          ['COMPLETED', 'TERMINATED_OPEN'].includes(c.status)
        );
      },
      error: err => {
        console.error('Error fetching consultations', err);
      }
    });
  }
}