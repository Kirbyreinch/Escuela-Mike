import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle, ApexFill } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import { forkJoin } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  colors: string[];
};

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private authService: AuthService, private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.fetchIngresoChartData();
    this.fetchEgresoChartData();
  }

  fetchIngresoChartData() {
    this.authService.dashboardingreso().subscribe(data => {
      const series = data.map((item: any) => item.total_monto);
      const labels = data.map((item: any) => item.categoria);

      this.authService.dashboardingreso_otros().subscribe(otherData => {
        const otherSeries = otherData.map((item: any) => item.total_monto);
        const otherLabels = otherData.map((item: any) => item.categoria);

        // Render the ingreso chart
        this.renderChart(series, labels, 'Total Ingresos', otherSeries, otherLabels, 'chartIngreso');
      }, error => {
        console.error('Error fetching ingreso other data', error);
      });
    }, error => {
      console.error('Error fetching ingreso data', error);
    });
  }

  fetchEgresoChartData() {
    this.authService.dashboardegreso().subscribe(data => {
      const series = data.map((item: any) => item.total_monto);
      const labels = data.map((item: any) => item.categoria);

      this.authService.dashboardegreso_otros().subscribe(otherData => {
        const otherSeries = otherData.map((item: any) => item.total_monto);
        const otherLabels = otherData.map((item: any) => item.categoria);

        // Render the egreso chart
        this.renderChart(series, labels, 'Total Egresos', otherSeries, otherLabels, 'chartEgreso');
      }, error => {
        console.error('Error fetching egreso other data', error);
      });
    }, error => {
      console.error('Error fetching egreso data', error);
    });
  }

  renderChart(series: number[], labels: string[], title: string, otherSeries: number[], otherLabels: string[], chartId: string) {
    const options = {
      chart: {
        type: 'pie',
        width: '80%',
        height: '150px'
      },
      series: series.concat(otherSeries),
      labels: labels.concat(otherLabels),
         responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

    // Remove any existing chart
    this.removeExistingChart(chartId);

    // Create a new chart element
    const chartElement = this.renderer.createElement('div');
    this.renderer.setAttribute(chartElement, 'id', chartId);
    this.renderer.setStyle(chartElement, 'width', '30%');
    this.renderer.setStyle(chartElement, 'margin-bottom', '20px'); // Espacio entre gráficos
    this.renderer.appendChild(this.el.nativeElement, chartElement);

    // Render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }

  removeExistingChart(chartId: string) {
    const existingChart = document.getElementById(chartId);
    if (existingChart) {
      existingChart.remove();
    }
  }
}