export class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public profilePicPath: string;
  public enabled: boolean;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    profilePicPath: string,
    enabled: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.profilePicPath = profilePicPath;
    this.enabled = enabled;
  }
}
