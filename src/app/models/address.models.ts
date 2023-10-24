
export class Address {
  private _id: String | undefined
  private _streetName: String | undefined
  private _streetNumber: String | undefined
  private _additional: String | undefined
  private _zipCode: String | undefined
  private _city: String | undefined
  private _country: String | undefined

  get id(): String | undefined {
    return this._id;
  }

  set id(value: String | undefined) {
    this._id = value;
  }

  get streetName(): String | undefined {
    return this._streetName;
  }

  set streetName(value: String | undefined) {
    this._streetName = value;
  }

  get streetNumber(): String | undefined {
    return this._streetNumber;
  }

  set streetNumber(value: String | undefined) {
    this._streetNumber = value;
  }

  get additional(): String | undefined {
    return this._additional;
  }

  set additional(value: String | undefined) {
    this._additional = value;
  }

  get zipCode(): String | undefined {
    return this._zipCode;
  }

  set zipCode(value: String | undefined) {
    this._zipCode = value;
  }

  get city(): String | undefined {
    return this._city;
  }

  set city(value: String | undefined) {
    this._city = value;
  }

  get country(): String | undefined {
    return this._country;
  }

  set country(value: String | undefined) {
    this._country = value;
  }
}
