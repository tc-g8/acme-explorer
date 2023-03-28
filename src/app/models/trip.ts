export class Trip {
  private _ticker!: string;
  private _title!: string;
  private _description!: string;
  private _requirements!: string[];
  private _cancelationReason?: string | undefined;
  private _price!: number;
  private _startDate!: Date;
  private _endDate!: Date;
  private _status!: string;
  private _imageCollections?: Buffer[] | undefined;

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

  public get status(): string {
    return this._status;
  }

  public set status(value: string) {
    this._status = value;
  }

  public get imageCollections(): Buffer[] | undefined {
    return this._imageCollections;
  }

  public set imageCollections(value: Buffer[] | undefined) {
    this._imageCollections = value;
  }
}



