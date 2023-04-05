export class Image {
  private _image!: string;
  private _alt?: string;

  constructor() {}

  public get image(): string {
    return this._image;
  }
  public set image(value: string) {
    this._image = value;
  }

  public get alt(): string {
    return this._alt!;
  }
  public set alt(value: string) {
    this._alt = value;
  }
}
