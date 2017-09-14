import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DataStorageService {
  // key = '17ace53f5ba401dc3a9b6000881de4b464d1a51a';
  key = '';
  // link = 'http://192.168.26.132';
  link = 'http://localhost';
  option = '?callback=JSONP_CALLBACK&key=' + this.key;

  constructor(private _jsonp: Jsonp) {
  }


  // ------------------------------------------
  // Projects
  // -----------------------------------------

  // Get ALL Projects
  getAllProjects() {
    return this._jsonp.get(this.link + '/projects.json' + this.option)
      .map(res => res.json());
  }

  // Get Project by Id
  getProject(projectId) {
    return this._jsonp.get(this.link + '/projects/' + projectId + '.json' + this.option )
      .map(res => res.json());
  }

  // Get Project by Id with Trackers
  getProjectWithTrackers(projectId) {
    return this._jsonp.get(this.link + '/projects/' + projectId + '.json' + this.option + '&include=trackers' )
      .map(res => res.json());
  }

  // Get Project by Id with Trackers and issues categories
  getProjectWithTrackersAndIssuesCat(projectId) {
    return this._jsonp.get(this.link + '/projects/' + projectId + '.json' + this.option + '&include=trackers,issue_categories' )
      .map(res => res.json());
  }

  // Get Project memberships by project Id
  getProjectMemberships(projectId) {
    return this._jsonp.get(this.link + '/projects/' + projectId + '/memberships.json' + this.option + '&include=trackers,issue_categories' )
      .map(res => res.json());
  }

  // ------------------------------------------
  // ISSUES
  // -----------------------------------------

  // Get ALL Issues
  getAllIssues() {
    return this._jsonp.get(this.link + '/issues.json' + this.option)
      .map(res => res.json());
  }

  // Get Issue by Id
  getIssue(id) {
    return this._jsonp.get(this.link + '/issues.json' + this.option + '&issue_id=' + id)
      .map(res => res.json());
  }

  // Get All info for Issue by Id
  getIssueAllInfo(id) {
    return this._jsonp.get(this.link + '/issues/' + id + '.json' + this.option )
      .map(res => res.json());
  }

  // Get Issues by project ID
  getProjectIssues(projectId) {
    return this._jsonp.get(this.link + '/issues.json' + this.option + '&project_id=' + projectId)
      .map(res => res.json());
  }

  // Get Issues by  tracker ID
  getTrackerIssues(trackerId) {
    return this._jsonp.get(this.link + '/issues.json' + this.option + '&tracker_id=' + trackerId)
      .map(res => res.json());
  }

  // Get Issues by project ID and tracker ID
  getProjectTrackerIssues(projectId, trackerId) {
    return this._jsonp.get(this.link + '/issues.json' + this.option + '&project_id=' + projectId + '&tracker_id=' + trackerId)
      .map(res => res.json());
  }

  // Get Issues Assigned to user (User Id)
  getIssuesAssignedTo(userId) {
    return this._jsonp.get(this.link + '/issues.json' + this.option + '&assigned_to_id=' + userId )
      .map(res => res.json());
  }

  // Get Issues by status Id
  getstatusIssues(statusId) {
    return this._jsonp.get(this.link + '/issues.json' + this.option + '&status_id=' + statusId )
      .map(res => res.json());
  }

  // ------------------------------------------
  // ISSUES Status
  // -----------------------------------------

  // Get all statuts for issues
  getAllStatusIssues() {
    return this._jsonp.get(this.link + '/issue_statuses.json' + this.option )
      .map(res => res.json());
  }

  // ------------------------------------------
  // Trackers
  // -----------------------------------------

  // Get all trackers
  getAllTrackers() {
    return this._jsonp.get(this.link + '/trackers.json' + this.option )
      .map(res => res.json());
  }

  // ------------------------------------------
  // Users
  // -----------------------------------------

  // Get all Users
  getAllUsers() {
    return this._jsonp.get(this.link + '/users.json' + this.option )
      .map(res => res.json());
  }
}
