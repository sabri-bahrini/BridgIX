import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from '../projects.service';
import {ActivatedRoute} from '@angular/router';
import {MembreModule} from '../modules/membre.module';
import {TrackerModule} from '../modules/tracker.module';

@Component({
    selector: 'app-user-profile',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
    autorise = false;
    private idProject;
    private projects;
    private myProjet;
    private trackers: TrackerModule[] = [];
    private managers: MembreModule[] = [];
    private devlopers: MembreModule[] = [];
    private tests: MembreModule[] = [];
    private sub: any = this.route.params.subscribe(params => {
        this.idProject = +params['id']; // (+) converts string 'id' to a number
        this.autorise = false;
        this.init();
    });

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

    // BAR SHART OPTION AND VARIBLES
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [];

    // PolarArea DATA and OPtion
    public polarAreaChartLabels: string[] = [];
    public polarAreaChartData: number[] = [];
    public polarAreaLegend: boolean = true;
    public polarAreaChartType: string = 'polarArea';

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    constructor(private projectService: ProjectsService, private route: ActivatedRoute) {
        this.projects = this.projectService.getProjects();
        this.trackers = this.projectService.getTrackers();
    }


    ngOnInit() {}

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    // INISIALIZE PROJECT
    init() {
        if (this.projects === null) {
            setTimeout(() => {
                this.init();
                console.log('Waiting Data ... ');
            }, 200);
        } else {
            setTimeout(() => {
                let estimated: any[] = [];
                let passed: any[] = [];
               this.myProjet = this.projectService.getProject(this.idProject);
                setTimeout(() => {
                    // Initialisse members of projects
                    this.managers = this.myProjet.getManagers();
                    this.devlopers = this.myProjet.getDevlopers();
                    this.tests = this.myProjet.getTesters();

                    // Initialise bar chart data
                    this.barChartLabels = [];
                    this.barChartData = [];
                    this.barChartLabels.push(this.myProjet.name);
                    passed.push(this.myProjet.passedTime);
                    estimated.push(this.myProjet.estimatedTime);
                    this.barChartData.push({data: passed, label: 'Temps passé'});
                    this.barChartData.push({data: estimated, label: 'Temps estimé'});

                    // Initialise Polaria
                    this.polarAreaChartLabels = [];
                    this.polarAreaChartData = [];
                    for (let tracker of this.trackers) {
                        this.polarAreaChartLabels.push(tracker['name']);
                        this.polarAreaChartData.push(this.myProjet.coutIssues(tracker['id']));
                    }
                    this.autorise = true;
                }, 300);


            }, 300);
        }
    }

    // DELETE project
    onDelete(projectId) {
        this.projectService.deleteProject(projectId);
    }

}
