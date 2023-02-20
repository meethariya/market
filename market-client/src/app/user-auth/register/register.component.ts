import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  firstName!: string;
  lastName!: string;
  fullName!: string;
  phone!: string;
  dob!: Date;
  gender!: string;
  email!: string;
  password!: string;
  houseNo!: string;
  addressLine1!: string;
  addressLine2!: string;
  city!: string;
  state!: string;
  pincode!: number;

  validClass = 'form-control is-valid';
  inValidClass = 'form-control is-invalid';
  validForm = true;

  errorMessage = "";
  failedStatus = false;
  successStatus = false;

  ok = faThumbsUp;
  notOk = faExclamationTriangle;

  constructor(private userAuthService: UserAuthService){}

  register() {
    // validation
    document.getElementById('firstName')!.className =
      this.firstName == null || this.firstName.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;

    document.getElementById('lastName')!.className =
      this.lastName == null || this.lastName.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('phone')!.className =
      this.phone == null || this.phone.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('dob')!.className =
      this.dob == null
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('userEmail')!.className =
      this.email == null || this.email.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('userPassword')!.className =
      this.password == null || this.password.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('houseNo')!.className =
      this.houseNo == null || this.houseNo.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('addressLine1')!.className =
      this.addressLine1 == null || this.addressLine1.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('city')!.className =
      this.city == null || this.city.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('state')!.className =
      this.state == null || this.state.length === 0
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;
    document.getElementById('pincode')!.className =
      this.pincode == null || this.pincode <= 100000 || this.pincode > 999999
        ? ((this.validForm = false), this.inValidClass)
        : this.validClass;

    if(this.validForm){
      let formData: FormData = new FormData();
      formData.set('gender', this.gender);
      formData.set('phone', this.phone);
      formData.set('dob', this.dob.toString());
      formData.set('name', this.firstName+" "+this.lastName);
      formData.set('email', this.email);
      formData.set('password', this.password);
      formData.set('houseNo', this.houseNo);
      formData.set('addressLine1', this.addressLine1);
      formData.set('addressLine2', this.addressLine2);
      formData.set('city', this.city);
      formData.set('state', this.state);
      formData.set('pincode', this.pincode.toString());
      console.log(this.dob);
      this.userAuthService.register(formData).subscribe({
        next: (data)=>{
          this.successStatus = true;
        },
        error: (err)=>{
          this.errorMessage = err.error;
          this.failedStatus = true;
        }
      });
    }
    this.validForm = true;
  }
}
