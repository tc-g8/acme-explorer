import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Datawarehouse } from '../models/datawarehouse.model';

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

  constructor(private http: HttpClient) {}

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
}
