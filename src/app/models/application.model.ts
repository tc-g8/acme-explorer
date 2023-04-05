import { ApplicationStatus } from '../enums/application.enum';
import { Entity } from './entity.model';

export class Application extends Entity {
  private _requestDate!: Date;
  private _status!: ApplicationStatus;
  private _comment?: string | undefined;
  private _rejectedReason?: string | undefined;
  private _trip_id!: string;
  private _explorer_id!: string;
  private _paidAt?: Date | undefined;

  constructor() {
    super();
  }

  public get requestDate(): Date {
    return this._requestDate;
  }
  public set requestDate(value: Date) {
    this._requestDate = value;
  }

  public get status(): ApplicationStatus {
    return this._status;
  }
  public set status(value: ApplicationStatus) {
    this._status = value;
  }

  public get comment(): string | undefined {
    return this._comment;
  }
  public set comment(value: string | undefined) {
    this._comment = value;
  }

  public get rejectedReason(): string | undefined {
    return this._rejectedReason;
  }
  public set rejectedReason(value: string | undefined) {
    this._rejectedReason = value;
  }

  public get trip_id(): string {
    return this._trip_id;
  }
  public set trip_id(value: string) {
    this._trip_id = value;
  }

  public get explorer_id(): string {
    return this._explorer_id;
  }
  public set explorer_id(value: string) {
    this._explorer_id = value;
  }

  public get paidAt(): Date | undefined {
    return this._paidAt;
  }
  public set paidAt(value: Date | undefined) {
    this._paidAt = value;
  }
}
