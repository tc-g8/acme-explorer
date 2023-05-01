export class Entity {
  private __id: string;
  private _version: number;

  constructor() {
    this.__id = '0';
    this._version = 0;
  }

  public get _id(): string {
    return this.__id;
  }

  public get version(): number {
    return this._version;
  }

  public set _id(value: string) {
    this.__id = value;
  }
}
