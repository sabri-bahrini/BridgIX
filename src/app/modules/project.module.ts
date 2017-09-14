import {MembreModule} from './membre.module';
import {IssueModule} from './issue.module';

export class ProjectModule {
  private _id: string;
  private _identifier: string;
  private _name: string;
  private _description: string;
  private _created: string;
  private _updated: string;
  private _estimatedTime;
  private _passedTime;
  private _progrssion;
  private _status: string;
  private _issus: IssueModule[];
  private _memberships: MembreModule[];

  constructor(id, identifier, title, des, created, updated, status) {
    this._id = id;
    this._identifier = identifier;
    this._name = title;
    this._description = des;
    this._created = created;
    this._updated = updated;
    this._status = status;
    // this.estimatedTime = estimated;
    // this.passedTime = passed;
    // this.progrssion = progress;
    // this.issus = issus;
    // this.members = memebers;
  }

  // Calculate Total estimated and spent time and progrss
  calculate() {
    this._estimatedTime = 0;
    this._passedTime = 0;
    this._progrssion = 0;
    setTimeout(() => {
      for (let issue of this.issus) {
        if (issue.tracker.name === 'Story') {
          this._estimatedTime = this.estimatedTime + issue.total_estimated_hours;
          this._passedTime = this.passedTime + issue.total_spent_hours;
          this._progrssion = this.progrssion + issue.done_ratio;
        }
      }
      console.log('Projet : ', this.id, ' Total passed : ',
        this.passedTime, ' Total estimated : ', this.estimatedTime, ' Progression % ', this.progrssion);
    }, 1000);
  }

  // Set Memberships project
  setMemberships(members: MembreModule[]) {
    this._memberships = members;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get identifier(): string {
    return this._identifier;
  }

  set identifier(value: string) {
    this._identifier = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get created(): string {
    return this._created;
  }

  set created(value: string) {
    this._created = value;
  }

  get updated(): string {
    return this._updated;
  }

  set updated(value: string) {
    this._updated = value;
  }

  get estimatedTime() {
    return this._estimatedTime;
  }

  set estimatedTime(value) {
    this._estimatedTime = value;
  }

  get passedTime() {
    return this._passedTime;
  }

  set passedTime(value) {
    this._passedTime = value;
  }

  get progrssion() {
    return this._progrssion;
  }

  set progrssion(value) {
    this._progrssion = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get issus(): IssueModule[] {
    return this._issus;
  }

  setIssus(value) {
    this._issus = value;
  }
}
