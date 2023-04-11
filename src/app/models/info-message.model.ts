export class InfoMessage {
  private _infoMessage!: string;
  private _cssClass!: string;

  constructor(infoMessage: string, cssClass: string) {
    this._infoMessage = infoMessage;
    this._cssClass = cssClass;
  }

  public get infoMessage(): string {
    return this._infoMessage;
  }

  public get cssClass(): string {
    return this._cssClass;
  }
}
