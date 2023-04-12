import { Entity } from './entity.model';
import { Image } from './image.model';
import { Sponsorship } from './sponsorship.model';
import { Stage } from './stage.model';
import { TripStatus } from '../enums/trip.enum';

export class Trip extends Entity {
  private _ticker!: string;
  private _title!: string;
  private _description!: string;
  private _requirements!: string[];
  private _cancelationReason?: string | undefined;
  private _price!: number;
  private _startDate!: Date;
  private _endDate!: Date;
  private _status!: TripStatus;
  private _stages?: Stage[] | undefined;
  private _sponsorships?: Sponsorship | undefined;
  private _manager_id!: string;
  private _imageCollection!: Image[];
  private _isNext?: boolean | undefined;

  constructor() {
    super();
  }

  public get ticker(): string {
    return this._ticker;
  }

  public set ticker(value: string) {
    this._ticker = value;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  public get requirements(): string[] {
    return this._requirements;
  }

  public set requirements(value: string[]) {
    this._requirements = value;
  }

  public get cancelationReason(): string | undefined {
    return this._cancelationReason;
  }

  public set cancelationReason(value: string | undefined) {
    this._cancelationReason = value;
  }

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    this._price = value;
  }

  public get startDate(): Date {
    return this._startDate;
  }

  public set startDate(value: Date) {
    this._startDate = value;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public set endDate(value: Date) {
    this._endDate = value;
  }

  public get status(): TripStatus {
    return this._status;
  }

  public set status(value: TripStatus) {
    this._status = value;
  }

  public get stages(): Stage[] | undefined {
    return this._stages;
  }
  public set stages(value: Stage[] | undefined) {
    this._stages = value;
  }

  public get imageCollection(): Image[] {
    return this._imageCollection;
  }

  public get sponsorships(): Sponsorship | undefined {
    return this._sponsorships;
  }
  public set sponsorships(value: Sponsorship | undefined) {
    this._sponsorships = value;
  }

  public get manager_id(): string {
    return this._manager_id;
  }
  public set manager_id(value: string) {
    this._manager_id = value;
  }

  public set imageCollection(value: Image[]) {
    this._imageCollection = value;
  }

  public get isNext(): boolean | undefined {
    return this._isNext;
  }
  public set isNext(value: boolean | undefined) {
    this._isNext = value;
  }
}
