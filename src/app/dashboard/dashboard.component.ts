import {Component, OnInit} from '@angular/core';
import {ProjectsService} from 'app/projects.service';
import {ProjectModule} from '../modules/project.module';


declare interface ProjectsInfo {
    nbrmembre: string;
    title: string;
    time: string;
    progress: string;

}

export const FOURPROJECTS: ProjectsInfo[] = [
    {title: 'BridgIX', nbrmembre: '20', time: '100 H', progress: '10%'},
    {title: 'Ticketvioo', nbrmembre: '20', time: '100 H', progress: '80%'},
    {title: 'Predix', nbrmembre: '20', time: '100 H', progress: '25%'},
    {title: 'W.academy', nbrmembre: '20', time: '100 H', progress: '65%'},
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    projects: ProjectModule[];
    fprojects: any[] = [];

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
    public barChartLabels: string[] = ['BridgIX', 'Ticketvioo', 'Predix', 'W.academy'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        {data: [65, 59, 80, 81], label: 'Project'}
    ];
    // PolarArea
    public polarAreaChartLabels: string[] = ['D1', 'D2', 'D3', 'D4', 'D5'];
    public polarAreaChartData: number[] = [80, 100, 60, 40, 55];
    public polarAreaLegend: boolean = true;

    public polarAreaChartType: string = 'polarArea';

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    constructor(private projectService: ProjectsService) {
    }

    calculColor(val) {
        var val2 = +val;
        if (val2 > 0 && val2 <= 25) {
            return 'red';
        } else if (val2 > 25 && val2 <= 70) {
            return 'orange';
        } else {
            return 'green';
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.projects = this.projectService.getProjects();
            console.log(' From Dash -> : ', this.projects, this.fprojects);
            this.initialiseProjectView();
        }, 1000);
        // this.fprojects = FOURPROJECTS.filter(menuItem => menuItem);
        this.fprojects = this.fprojects.filter(menuItem => menuItem);
    }

    // Initialise Project Items for dashbord view
    initialiseProjectView() {
        if (this.projects.length > 0) {
            console.log(' Im in initialise project ----- ');
            for (let p of this.projects) {
                this.fprojects.push(
                    {
                        title: p['name'],
                        nbrmembre: p['_memberships'].length,
                        time: p['estimatedTime'] + ' H',
                        progress: p['progrssion'] + ' %'
                    }
                    );
                console.log(' 4 Projects  : ', this.fprojects);
            }
        } else {
            setTimeout(() => {
                console.log('Waiting for data ...');
                this.initialiseProjectView();
            }, 500);
        }
    }
}
