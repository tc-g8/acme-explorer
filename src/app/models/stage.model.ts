import { Entity } from './entity.model';

export class Stage extends Entity {
  private _title!: string;
  private _description!: string;
  private _price!: number;

  constructor() {
    super();
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

  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }
}
