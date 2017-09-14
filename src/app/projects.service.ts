import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ProjectModule} from './modules/project.module';
import {DataStorageService} from './Data.service';
import {MembreModule} from './modules/membre.module';
import {RoleModule} from './modules/role.module';
import {IssueModule} from './modules/issue.module';
import {TrackerModule} from './modules/tracker.module';

@Injectable()
export class ProjectsService {
    private projects: ProjectModule[] = [];
    private trackerStoryId = '';
    private storyIssues;


    constructor(private dataStorageService: DataStorageService) {
    }

    // Initialisation_Methode_for_projects_details
    init(): void {
        let project: ProjectModule;
        this.dataStorageService.getAllProjects().subscribe(
            (data) => {
                for (const x of data['projects']) {
                    project = new ProjectModule(x['id'], x['identifier'], x['name'],
                        x['description'], x['created_on'], x['updated_on'], x['status']);
                    project.setMemberships(this.getMemberships(x['id']));

                    project.setIssus(this.getIssues(x['id']));
                    project.calculate();
                    // this.getIssues(x['id']);
                    this.projects.push(project);
                }
                setTimeout(() => {
                    console.log('From ProjectService : ->', this.projects);
                }, 3000);
            },
            (error) => {
                console.log(error);
            });
    }

    // Return list of memberships project
    getMemberships(projectId): MembreModule[] {
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
    getIssues(projectId): IssueModule[] {
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


    // GET PROJECT COPIE
    getProjects() {
        return this.projects;
    }

}
