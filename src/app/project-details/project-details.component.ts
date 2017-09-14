import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-user-profile',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
    // public barChartOptions:any = {
    //     scaleShowVerticalLines: false,
    //     responsive: true,
    //     scaleBeginAtZero: true,
    //     barBeginAtOrigin: true
    // };

    public barChartOptions: any = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public barChartLabels: string[] = ['BridgIX'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        {data: [40], label: 'Temps passé'},
        {data: [70], label: 'Temps estimé'}
    ];
    // Doughnut
    public doughnutChartLabels: string[] = ['Story', 'Tache', 'Anomalie'];
    public doughnutChartData: number[] = [50, 25, 25];
    public doughnutChartType: string = 'doughnut';

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
