import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  public chart: any;
  data = [];
  citizenShipValues = [];
  skillValues = [];
  occupationValues = [];
  memberOfValues = [];
  uniqueCitizenShipKeys = [];
  @Input() dataProp = [];

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    this.data = this.dataProp;
    this.citizenShipValues = this.data.map((items) => {
      return items['citizenshipLabel'];
    });
    this.uniqueCitizenShipKeys = [...new Set(this.citizenShipValues)];
    this.skillValues = this.data.map((items) => {
      return items['skillsLabel'];
    });
    this.occupationValues = this.data.map((items) => {
      return items['occupationLabel'];
    });
    this.memberOfValues = this.data.map((items) => {
      return items['memberOfLabel'];
    });
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {
        // values on X-Axis
        labels: this.uniqueCitizenShipKeys,
        datasets: [
          {
            label: 'citizenshipLabel',
            data: this.citizenShipValues,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
