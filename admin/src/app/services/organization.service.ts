import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Organization } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {}

  getAllOrganizations(): Observable<Organization[]> {
    return this.http.get<ApiResponse<Organization[]>>(`${environment.apiUrl}/v1/organization`).pipe(
      map(response => response.data)
    );
  }

  createOrganization(organization: { name: string; logo?: string; primaryColor?: string; footerMarkdown?: string }): Observable<Organization> {
    return this.http.post<ApiResponse<Organization>>(`${environment.apiUrl}/v1/organization`, organization).pipe(
      map(response => response.data)
    );
  }

  updateOrganization(id: number, organization: { name: string; logo?: string; primaryColor?: string; footerMarkdown?: string }): Observable<Organization> {
    return this.http.patch<ApiResponse<Organization>>(`${environment.apiUrl}/v1/organization/${id}`, organization).pipe(
      map(response => response.data)
    );
  }

  deleteOrganization(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${environment.apiUrl}/v1/organization/${id}`);
  }

}
