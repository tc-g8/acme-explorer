import { Entity } from './entity.model';
import { SponsorshipStatus } from '../enums/sponsorship.enum';
import { Image } from './image.model';

export class Sponsorship extends Entity {
  private _banner!: Image;
  private _landingPage!: string;
  private _amount!: number;
  private _status!: SponsorshipStatus;
  private _sponsor_id!: string;
  private _trip_id!: string;

  constructor() {
    super();
  }

  public get banner(): Image {
    return this._banner;
  }
  public set banner(value: Image) {
    this._banner = value;
  }

  public get landingPage(): string {
    return this._landingPage;
  }
  public set landingPage(value: string) {
    this._landingPage = value;
  }

  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    this._amount = value;
  }

  public get status(): SponsorshipStatus {
    return this._status;
  }
  public set status(value: SponsorshipStatus) {
    this._status = value;
  }

  public get sponsor_id(): string {
    return this._sponsor_id;
  }
  public set sponsor_id(value: string) {
    this._sponsor_id = value;
  }

  public get trip_id(): string {
    return this._trip_id;
  }
  public set trip_id(value: string) {
    this._trip_id = value;
  }
}
