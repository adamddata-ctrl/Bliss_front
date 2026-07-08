import { Component, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { environment } from '../../../environments/environment';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  public chart: any;
  public categoryMetrics: Record<string, number> = {};
  private metricsUrl = `${environment.apiUrl}/api/metrics/category-distribution`;
 // Injecting NgZone lets us run the chart window completely safe from click events
  constructor(private http: HttpClient, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.fetchMetricsData();
  }

  ngOnDestroy(): void {
    // Explicitly destroy the chart lifecycle instance when leaving the page
    if (this.chart) {
      this.chart.destroy();
    }
  }

  fetchMetricsData(): void {
    this.http.get<Record<string, number>>(this.metricsUrl).subscribe({
      next: (res) => { 
         this.categoryMetrics = res;
        
        // Use a safe macro-task queue delay so the HTML template renders first
        setTimeout(() => {
          this.ngZone.runOutsideAngular(() => {
            this.renderDistributionChart(Object.keys(res), Object.values(res));
          });
        }, 100);
      },
      error: (err) => {
        console.error('Failed to communicate with metrics analytics endpoint', err);
      }
    });
  }
   renderDistributionChart(labels: string[], values: number[]): void {
    const canvasElement = document.getElementById('categoryDistributionChart') as HTMLCanvasElement;
    
    if (!canvasElement) {
      console.warn('Canvas container element not found in DOM yet.');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvasElement, {
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