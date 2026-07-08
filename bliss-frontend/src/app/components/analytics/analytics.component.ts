import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  public categoryMetrics: Record<string, number> = {};
  private metricsUrl = `${environment.apiUrl}/api/metrics/category-distribution`;

  public pieChartType: ChartType = 'pie';
  public pieChartLabels: string[] = [];
  public pieChartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = [ 
    { 
      data: [], 
      backgroundColor: ['#0d6efd', '#6c757d', '#ffc107', '#dc3545', '#198754'],
      hoverBackgroundColor: ['#0a58ca', '#5a6268', '#e0a800', '#bd2130', '#157347']
    }
  ];
  
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'Segoe UI', size: 12 }
        }
      }
        }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMetricsData();
  }

  fetchMetricsData(): void {
    this.http.get<Record<string, number>>(this.metricsUrl).subscribe({
      next: (res) => {
        this.categoryMetrics = res;
        this.pieChartLabels = Object.keys(res).map(l => l.charAt(0).toUpperCase() + l.slice(1));
        this.pieChartDatasets[0].data = Object.values(res);
      },
      error: (err) => {
          console.error('Failed to communicate with metrics analytics endpoint', err);
      }
    });
  }
}