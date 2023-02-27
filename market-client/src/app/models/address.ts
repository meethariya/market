export class Address {
  public id: number;
  public houseNo: string;
  public addressLine1: string;
  public addressLine2: string;
  public city: string;
  public state: string;
  public pincode: number;

  constructor(
    id: number,
    houseNo: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    pincode: number
  ) {
    this.id = id;
    this.houseNo = houseNo;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.city = city;
    this.state = state;
    this.pincode = pincode;
  }
}
