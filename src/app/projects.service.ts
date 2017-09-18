import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ProjectModule} from './modules/project.module';
import {DataStorageService} from './Data.service';
import {MembreModule} from './modules/membre.module';
import {RoleModule} from './modules/role.module';
import {IssueModule} from './modules/issue.module';
import {TrackerModule} from './modules/tracker.module';
import {Router} from '@angular/router';

@Injectable()
export class ProjectsService {
    private projects: ProjectModule[] = [];
    private trackers: TrackerModule[] = [];
    private users;
    private _dataFormSearch = {colaborateur: '', dateD: '', dateF: ''};


    constructor(private dataStorageService: DataStorageService, private router: Router) {
    }

    // Initialisation_Methode_for_projects_details
    init(): void {
        this.initProjects();
        this.initTrackers();
        this.initUsers();
    }

    // INITIALISE PROJECT
    private initProjects() {
        let project: ProjectModule;
        this.dataStorageService.getAllProjects().subscribe(
            (data) => {
                for (const x of data['projects']) {
                    project = new ProjectModule(x['id'], x['identifier'], x['name'],
                        x['description'], x['created_on'], x['updated_on'], x['status']);
                    project.setMemberships(this.getMemberships(x['id']));

                    project.setIssus(this.getIssues(x['id']));
                    project.calculate();
                    this.projects.push(project);
                }
                // setTimeout(() => {
                //     console.log('From ProjectService : ->', this.projects);
                // }, 3000);
            },
            (error) => {
                console.log(error);
            });
    }

    // INITIALISE trackers list
    private initTrackers() {
        let tracker: TrackerModule;
        this.dataStorageService.getAllTrackers().subscribe(
            (data) => {
                for (const x of data['trackers']) {
                    tracker = new TrackerModule(x['id'], x['name']);
                    this.trackers.push(tracker);
                }
                // setTimeout(() => {
                //     console.log('From ProjectService : -> Tracker : ', this.trackers);
                // }, 3000);
            },
            (error) => {
                console.log(error);
            });
    }

    // INITIALISE Users List
    private initUsers() {
        this.dataStorageService.getAllUsers().subscribe(
            (data) => {
                this.users = data['users'];
            },
            (error) => {
                console.log(error);
            });
    }

    // Return list of memberships project
    private getMemberships(projectId): MembreModule[] {
        let res: MembreModule[] = [];
        this.dataStorageService.getProjectMemberships(projectId).subscribe(
            (data) => {
                // console.log(data);
                for (const membre of data['memberships']) {
                    let role = new RoleModule(membre['roles'][0]['id'], membre['roles'][0]['name'])
                    res.push(new MembreModule(membre['user']['id'], membre['user']['name'], role));
                }
            },
            (error) => {
                console.log(error);
            });
        return res;
    }

    // Get All issues for project
    private getIssues(projectId): IssueModule[] {
        let res: IssueModule[] = [];
        this.dataStorageService.getProjectIssues(projectId).subscribe(
            (data) => {
                for (let issue of data['issues']) {
                    // console.log('id : ', issue['id']);
                    this.dataStorageService.getIssueAllInfo(issue['id']).subscribe(
                        (info) => {
                            let is = info['issue'];
                            let tracker = new TrackerModule(is['tracker']['id'], is['tracker']['name']);
                            //   total_estimated_hours, spent_hours, total_spent_hours) {
                            let val = new IssueModule(is['id'], tracker, is['subject'], is['description'],
                                is['start_date'], is['due_date'], is['done_ratio'], is['estimated_hours'],
                                is['total_estimated_hours'], is['spent_hours'], is['total_spent_hours']
                            );
                            res.push(val);
                        }
                    );
                }
            },
            (error) => {
                console.log(error);
            });
        return res;
    }

    // Return Search Project by id
    getProject(projectID) {
        let res: ProjectModule;
        let index = 0;
        let find = false;
        let length = this.projects.length;
        while (index < length && !find) {
            if (this.projects[index].id === projectID) {
                res = this.projects[index];
                find = true;
            }
            index++;
        }
        return res;
    }


    // GET PROJECT COPIE
    getProjects() {
        return this.projects;
    }

    // Return Trackers
    getTrackers() {
        return this.trackers;
    }

    // RETURN USERS
    getUsers() {
        return this.users;
    }

    get dataFormSearch() {
        return this._dataFormSearch;
    }

    set dataFormSearch(value) {
        this._dataFormSearch = value;
    }

    // Set form serch with parametres
    setDataFormSerch(date1, date2, colaborateur) {
        this.dataFormSearch = {colaborateur: colaborateur, dateD: date1, dateF: date2};
    }

    // Navigate to search
    navigateSearch() {
        this.router.navigate(['/panel/search']);
    }

    // Navigate to search
    navigatePanel() {
        this.router.navigate(['/panel']);
    }

    // Navigate to Dashboard
    navigateDashboard() {
        this.router.navigate(['/panel']);
    }

    // ADD Project to redmine
    addProject(project) {
        return this.dataStorageService.addProject(project);
    }

    // EDIT Project passed id
    editProject(projectId, projectObject) {
        return this.dataStorageService.editProject(projectId, projectObject);
    }

    // DELETE PROJECT
    deleteProject(projectId) {
        this.dataStorageService.deleteProject(projectId);
        this.navigateDashboard();
    }
}
