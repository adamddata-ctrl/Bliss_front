import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  public chart: any;
  public categoryMetrics: Record<string, number> = {};

  // Pointing directly to your local backend API endpoint path
  private metricsUrl = '/api/metrics/category-distribution';
 constructor(private http: HttpClient) {}

  ngOnInit(): void {
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