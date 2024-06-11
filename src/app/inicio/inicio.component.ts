import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import ApexCharts from 'apexcharts';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Chart } from 'chart.js/auto'; // Importar Chart

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {


  startDate: number = 0;
  endDate: number = 0;
  startDate2: number = 0;
  endDate2: number = 0;


  ingresosPorAnoChart: any;
  egresosPorAnoChart: any;

  constructor(private authService: AuthService, private el: ElementRef, private renderer: Renderer2) {}
  escuelaLogo: string | null = null;


  
  ngOnInit() {
    this.fetchIngresoChartData('total');
    this.fetchEgresoChartData('total');
    this.authService.logo$.subscribe(logo => {
      this.escuelaLogo = logo;
      console.log('Logo de la escuela:', this.escuelaLogo); // Console log for the logo
    });
  }








  fetchChartDataByYear() {
    if (this.startDate && this.endDate) {
        this.authService.Ingresos_Año(this.startDate, this.endDate).subscribe(ingresoData => {
            const ingresoSeries: number[] = ingresoData.map((item: any) => item.total_monto);
            const ingresoLabels: string[] = ingresoData.map((item: any) => item.categoria);
      
            this.authService.OtrosIngresos_Año(this.startDate, this.endDate).subscribe(otrosIngresoData => {
                const otrosIngresoSeries: number[] = otrosIngresoData.map((item: any) => item.total_monto);
                const otrosIngresoLabels: string[] = otrosIngresoData.map((item: any) => item.categoria);
                
                // Agregar los datos de otros ingresos a los datos de ingresos
                const combinedSeries: number[] = ingresoSeries.concat(otrosIngresoSeries);
                const combinedLabels: string[] = ingresoLabels.concat(otrosIngresoLabels);

                // Renderizar la gráfica de ingresos por año con los datos combinados
                this.renderChart(combinedSeries, combinedLabels, 'Ingresos por Año', [], [], 'chartIngresosAño');
            }, (error: any) => {
                console.error('Error fetching otros ingreso data', error);
            });
        }, (error: any) => {
            console.error('Error fetching ingreso data', error);
        });
    } else {
        console.error('Debe ingresar un año inicial y final');
    }
}




fetchChartDataByYear2() {
  if (this.startDate2 && this.endDate2) {
      this.authService.Egresos_Año(this.startDate2, this.endDate2).subscribe(EgresoData => {
          const EgresoSeries: number[] = EgresoData.map((item: any) => item.total_monto);
          const EgresoDataLabels: string[] = EgresoData.map((item: any) => item.categoria);
    
          // Renderizar la gráfica de ingresos por año
          this.renderChart(EgresoSeries, EgresoDataLabels, 'Egresos por Año', [], [], 'chartegresosAño');
      }, (error: any) => {
          console.error('Error fetching ingreso data', error);
      });
  } else {
      console.error('Debe ingresar un año inicial y final');
  }
}



  fetchIngresoChartData(type: string, month?: number) {
    let ingresoObservable: Observable<any>;
    let ingresoOtrosObservable: Observable<any>;
  
    if (type === 'total') {
      ingresoObservable = this.authService.dashboardingreso();
      ingresoOtrosObservable = this.authService.dashboardingreso_otros();
    } else if (type === 'currentMonth') {
      ingresoObservable = this.authService.dashboaringresos_mes();
      ingresoOtrosObservable = this.authService.dashboaringresos_otros_mes();
    } else {
      ingresoObservable = this.authService.dashboardingreso_pormes(month!);
      ingresoOtrosObservable = this.authService.dashboardingreso_otrospormes(month!);
    }
  
    ingresoObservable.subscribe(data => {
      const series: number[] = data.map((item: any) => item.total_monto);
      const labels: string[] = data.map((item: any) => item.categoria);
  
      if (series.length === 0) {
        // No hay datos en ingresoObservable, mostrar un mensaje y renderizar una gráfica vacía
        this.renderEmptyChart('Ingresos', 'chartIngresos');
      } else {
        ingresoOtrosObservable.subscribe((otherData: any) => {
          const otherSeries: number[] = otherData.map((item: any) => item.total_monto);
          const otherLabels: string[] = otherData.map((item: any) => item.categoria);
  
          if (otherSeries.length > 0) {
            // Renderizar la gráfica con datos de "otros ingresos"
            this.renderChart(series, labels, 'Ingresos', otherSeries, otherLabels, 'chartIngresos');
          } else {
            // No hay datos de "otros ingresos", renderizar la gráfica solo con los datos de ingresos normales
            this.renderChart(series, labels, 'Ingresos', [], [], 'chartIngresos');
          }
        }, (error: any) => {
          console.error('Error fetching ingreso other data', error);
        });
      }
    }, (error: any) => {
      console.error('Error fetching ingreso data', error);
    });
  }

fetchEgresoChartData(type: string, month?: number) {
  let egresoObservable: Observable<any>;
  let egresoOtrosObservable: Observable<any>;

  if (type === 'total') {
    egresoObservable = this.authService.dashboardegreso();
    egresoOtrosObservable = this.authService.dashboardegreso_otros();
  } else {
    if (type === 'currentMonth') {
      egresoObservable = this.authService.dashboaregresos_mes();
      egresoOtrosObservable = of([]); // Observable vacío
    } else {
      egresoObservable = this.authService.dashboardegreso_pormes(month!);
      egresoOtrosObservable = of([]); // Observable vacío
    }
  }

  egresoObservable.subscribe(data => {
    const series: number[] = data.map((item: any) => item.total_monto);
    const labels: string[] = data.map((item: any) => item.categoria);

    egresoOtrosObservable.subscribe(otherData => {
      const otherSeries: number[] = otherData.map((item: any) => item.total_monto);
      const otherLabels: string[] = otherData.map((item: any) => item.categoria);

      // Renderizar la gráfica con datos de egresos y otros egresos si están disponibles, de lo contrario, solo con los datos de egresos normales
      this.renderChart(series, labels, 'Total Egresos', otherSeries, otherLabels, 'chartEgresos');
    }, (error: any) => {
      console.error('Error fetching other egreso data', error);
    });
  }, (error: any) => {
    console.error('Error fetching egreso data', error);
  });
}

  renderEmptyChart(title: string, chartId: string) {
    const options = {
      chart: {
        type: 'pie',
        width: '100%',
        height: '300px',
        background: '#fff' // Establecer el fondo del gráfico como blanco
      },
      series: [0], // Serie con un valor de 0
      labels: ['No hay datos disponibles'], // Etiqueta para indicar la ausencia de datos
      title: {
        text: title,
        align: 'center'
      },
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

    // Render the chart
    const chartElement = this.el.nativeElement.querySelector(`#${chartId}`);
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }

  renderChart(series: number[], labels: string[], title: string, otherSeries: number[], otherLabels: string[], chartId: string) {
    const options = {
      chart: {
        type: 'pie',
        width: '100%',
        height: '300px'
      },
      series: series.concat(otherSeries),
      labels: labels.concat(otherLabels),
      title: {
        text: title,
        align: 'center'
      },
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

    // Render the chart
    const chartElement = this.el.nativeElement.querySelector(`#${chartId}`);
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }

  removeExistingChart(chartId: string) {
    const existingChart = this.el.nativeElement.querySelector(`#${chartId}`);
    if (existingChart && existingChart.firstChild) {
      existingChart.removeChild(existingChart.firstChild);
    }
  }

  onChartTypeChange(chartType: string, event: any) {
    const selectedValue = event.target.value;

    if (chartType === 'ingresos') {
      if (selectedValue === 'total') {
        this.fetchIngresoChartData('total');
      } else if (selectedValue === 'currentMonth') {
        this.fetchIngresoChartData('currentMonth');
      } else {
        this.fetchIngresoChartData('month', parseInt(selectedValue));
      }
    } else if (chartType === 'egresos') {
      if (selectedValue === 'total') {
        this.fetchEgresoChartData('total');
      } else if (selectedValue === 'currentMonth') {
        this.fetchEgresoChartData('currentMonth');
      } else {
        this.fetchEgresoChartData('month', parseInt(selectedValue));
      }
    }
  }
}