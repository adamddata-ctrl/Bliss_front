import { Component, AfterViewInit } from '@angular/core'; // 1. Change OnInit to AfterViewInit
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { environment } from '../../../environments/environment';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit { // 2. Change hook declaration here
  public chart: any;
  public categoryMetrics: Record<string, number> = {};
  private metricsUrl = `${environment.apiUrl}/api/metrics/category-distribution`;

  constructor(private http: HttpClient) {}

  // 3. Change ngOnInit() to ngAfterViewInit()
  ngAfterViewInit(): void {
    this.fetchMetricsData();
  }

  fetchMetricsData(): void {
    this.http.get<Record<string, number>>(this.metricsUrl).subscribe({
      next: (res) => {
        this.categoryMetrics = res;
        this.renderDistributionChart(Object.keys(res), Object.values(res));
      },
        error: (err) => {
        console.error('Failed to communicate with metrics analytics endpoint', err);
      }
    });
  }

  renderDistributionChart(labels: string[], values: number[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('categoryDistributionChart', {
      type: 'pie',
      data: {
        labels: labels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
        datasets: [{
          data: values,
            backgroundColor: ['#0d6efd', '#6c757d', '#ffc107', '#dc3545', '#198754'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 15,
              font: { family: 'Segoe UI', size: 12 }
            }
          }
           }
      }
    });
  }
}