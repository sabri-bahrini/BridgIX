import {TrackerModule} from './tracker.module';

export class IssueModule {

  private _id: string;
  private _tracker: TrackerModule;
  private _subject: string;
  private _description: string;
  private _start_date: string;
  private _due_date: string;
  private _done_ratio;
  private _estimated_hours;
  private _total_estimated_hours;
  private _spent_hours;
  private _total_spent_hours;


  constructor(id: string, tracker: TrackerModule, subject: string, description: string, start_date: string, due_date: string, done_ratio, estimated_hours, total_estimated_hours, spent_hours, total_spent_hours) {
    this._id = id;
    this._tracker = tracker;
    this._subject = subject;
    this._description = description;
    this._start_date = start_date;
    this._due_date = due_date;
    this._done_ratio = done_ratio;
    this._estimated_hours = estimated_hours;
    this._total_estimated_hours = total_estimated_hours;
    this._spent_hours = spent_hours;
    this._total_spent_hours = total_spent_hours;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get tracker(): TrackerModule {
    return this._tracker;
  }

  set tracker(value: TrackerModule) {
    this._tracker = value;
  }

  get subject(): string {
    return this._subject;
  }

  set subject(value: string) {
    this._subject = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get start_date(): string {
    return this._start_date;
  }

  set start_date(value: string) {
    this._start_date = value;
  }

  get due_date(): string {
    return this._due_date;
  }

  set due_date(value: string) {
    this._due_date = value;
  }

  get done_ratio() {
    return this._done_ratio;
  }

  set done_ratio(value) {
    this._done_ratio = value;
  }

  get estimated_hours() {
    return this._estimated_hours;
  }

  set estimated_hours(value) {
    this._estimated_hours = value;
  }

  get total_estimated_hours() {
    return this._total_estimated_hours;
  }

  set total_estimated_hours(value) {
    this._total_estimated_hours = value;
  }

  get spent_hours() {
    return this._spent_hours;
  }

  set spent_hours(value) {
    this._spent_hours = value;
  }

  get total_spent_hours() {
    return this._total_spent_hours;
  }

  set total_spent_hours(value) {
    this._total_spent_hours = value;
  }
}
