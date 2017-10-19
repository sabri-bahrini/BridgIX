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
    autorisation = false;
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

    // BAR chart LABELS AND DATA And sume Options
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [];

    // PolarArea DATA and OPtion
    public polarAreaChartLabels: string[] = [];
    public polarAreaChartData: number[] = [];
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


    ngOnInit() {
        setTimeout(() => {
            this.projects = this.projectService.getProjects();
            this.initialiseProjectView();
        }, 1000);
        // this.fprojects = FOURPROJECTS.filter(menuItem => menuItem);
        this.fprojects = this.fprojects.filter(menuItem => menuItem);
    }

    // Initialise Project Items for dashbord view
    initialiseProjectView() {
        if (this.projects.length > 0) {
            // for (let p of this.projects)
            let i = 1;
            let databar = [];
            let length = this.projects.length;
            while (i < length && i < 5) {
                let p: ProjectModule = this.projects[length - i];
                let res = p.calculateTab();
                if (res === null) {
                    console.log(' Waiting data Dashboard Progress ....');
                    setTimeout(this.initialiseProjectView(), 500);
                } else {
                    // data bar charts init
                    this.barChartLabels.push(p['name']);
                    databar.push(res['progrssion']);
                    // Data circle shart
                    this.polarAreaChartLabels.push(p['name']);
                    this.polarAreaChartData.push(res['estimatedTime']);
                    // data project view init
                    this.fprojects.push(
                        {
                            title: p['name'],
                            nbrmembre: p['_memberships'].length,
                            time: res['estimatedTime'],
                            progress: res['progrssion']
                        }
                    );
                }
                i++;
            }
            this.barChartData.push({data: databar, label: 'Project'});
            console.log('Bar chart details', this.barChartData);
            this.autorisation = true;
        } else {
            setTimeout(() => {
                console.log('Waiting for data ...');
                this.initialiseProjectView();
            }, 500);
        }
    }


}
