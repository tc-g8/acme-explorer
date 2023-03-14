import { Entity } from './entity.model';

export class Actor extends Entity {
  private _name!: string;
  private _surname!: string;
  private _email!: string;
  private _phone?: string | undefined;
  private _address?: string | undefined;
  private _password!: string;
  private _customToken?: string | undefined;
  private _idToken?: string | undefined;
  private _preferredLanguage?: string | undefined;
  private _role!: string;

  constructor() {
    super();
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get surname(): string {
    return this._surname;
  }
  public set surname(value: string) {
    this._surname = value;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  public get phone(): string | undefined {
    return this._phone;
  }
  public set phone(value: string | undefined) {
    this._phone = value;
  }

  public get address(): string | undefined {
    return this._address;
  }
  public set address(value: string | undefined) {
    this._address = value;
  }

  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  public get customToken(): string | undefined {
    return this._customToken;
  }
  public set customToken(value: string | undefined) {
    this._customToken = value;
  }

  public get idToken(): string | undefined {
    return this._idToken;
  }
  public set idToken(value: string | undefined) {
    this._idToken = value;
  }

  public get preferredLanguage(): string | undefined {
    return this._preferredLanguage;
  }
  public set preferredLanguage(value: string | undefined) {
    this._preferredLanguage = value;
  }

  public get role(): string {
    return this._role;
  }
  public set role(value: string) {
    this._role = value;
  }
}
