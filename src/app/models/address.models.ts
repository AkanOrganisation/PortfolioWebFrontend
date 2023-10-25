
export class Address {
  private _id: String = ""
  private _streetName: String = ""
  private _streetNumber: String = ""
  private _additional: String = ""
  private _zipCode: String = ""
  private _city: String = ""
  private _country: String = ""

  get id(): String {
    return this._id;
  }

  set id(value: String) {
    this._id = value;
  }

  get streetName(): String {
    return this._streetName;
  }

  set streetName(value: String ) {
    this._streetName = value;
  }

  get streetNumber(): String  {
    return this._streetNumber;
  }

  set streetNumber(value: String ) {
    this._streetNumber = value;
  }

  get additional(): String  {
    return this._additional;
  }

  set additional(value: String ) {
    this._additional = value;
  }

  get zipCode(): String  {
    return this._zipCode;
  }

  set zipCode(value: String ) {
    this._zipCode = value;
  }

  get city(): String  {
    return this._city;
  }

  set city(value: String ) {
    this._city = value;
  }

  get country(): String  {
    return this._country;
  }

  set country(value: String) {
    this._country = value;
  }
}
