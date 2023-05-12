import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Datawarehouse } from '../models/datawarehouse.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardUrl = environment.backendApiBaseURL + '/api/v1/dashboard';
  private configurationUrl =
    environment.backendApiBaseURL + '/api/v2/configurations';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getIndicators() {
    const url = `${this.dashboardUrl}/latest`;
    return this.http.get<Datawarehouse[]>(url);
  }

  getReport() {
    const url = `${this.dashboardUrl}/latest?type=pdf`;
    return this.http.get(url, { responseType: 'text' });
  }

  getAmoutSpentByExplorer(id: string, period: string) {
    const url = `${this.dashboardUrl}/amount-spent-by-explorer`;

    const body = JSON.stringify({
      explorer_id: id,
      period,
    });

    return this.http.post<any>(url, body, httpOptions);
  }

  getExplorersByAmountSpent(period: string, theta: string, v: number) {
    const url = `${this.dashboardUrl}/explorers-by-amount-spent`;

    const body = JSON.stringify({
      period,
      theta,
      v,
    });

    return this.http.post<any>(url, body, httpOptions);
  }

  updateFlatRate(flat_rate: number) {
    const url = `${this.configurationUrl}/63ef50fea06dbef16f6193e6`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );

    const body = JSON.stringify({
      sponsorshipPrice: flat_rate,
    });

    return this.http.put<any>(url, body, httpOptions);
  }
}
