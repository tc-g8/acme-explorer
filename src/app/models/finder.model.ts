import { Entity } from './entity.model';

export class Finder extends Entity {
  private _keyword?: string | undefined;
  private _minPrice?: number | undefined;
  private _maxPrice?: number | undefined;
  private _minDate?: Date | undefined;
  private _maxDate?: Date | undefined;
  private _date!: Date;
  private _explorer_id!: string;

  constructor() {
    super();
  }

  public get keyword(): string | undefined {
    return this._keyword;
  }
  public set keyword(value: string | undefined) {
    this._keyword = value;
  }

  public get minPrice(): number | undefined {
    return this._minPrice;
  }
  public set minPrice(value: number | undefined) {
    this._minPrice = value;
  }

  public get maxPrice(): number | undefined {
    return this._maxPrice;
  }
  public set maxPrice(value: number | undefined) {
    this._maxPrice = value;
  }

  public get minDate(): Date | undefined {
    return this._minDate;
  }
  public set minDate(value: Date | undefined) {
    this._minDate = value;
  }

  public get maxDate(): Date | undefined {
    return this._maxDate;
  }
  public set maxDate(value: Date | undefined) {
    this._maxDate = value;
  }

  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }

  public get explorer_id(): string {
    return this._explorer_id;
  }
  public set explorer_id(value: string) {
    this._explorer_id = value;
  }
}
