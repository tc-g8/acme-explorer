import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Datawarehouse } from '../models/datawarehouse.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl = environment.backendApiBaseURL + '/api/v1/dashboard';

  constructor(private http: HttpClient) { }

  getIndicators() {
    const url = `${this.dashboardUrl}/latest`;
    return this.http.get<Datawarehouse[]>(url);
  }

  getReport() {
    const url = `${this.dashboardUrl}/latest?type=pdf`;
    return this.http.get(url, { responseType: 'text' });
  }
}
