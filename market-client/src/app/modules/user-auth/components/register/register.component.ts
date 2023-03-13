import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faExclamationTriangle,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
    ]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`
      ),
    ]),
    houseNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    addressLine1: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    addressLine2: new FormControl('', [Validators.maxLength(50)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    state: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.min(100000),
      Validators.max(999999),
    ]),
    agreeTermsAndConditions: new FormControl('', [Validators.required]),
  });

  errorMessage = '';
  failedStatus = false;
  successStatus = false;

  ok = faThumbsUp;
  notOk = faExclamationTriangle;

  constructor(private userAuthService: UserAuthService) {}

  register() {
    // validation
    if (
      this.registerForm.value.addressLine1 != null &&
      this.registerForm.value.addressLine2 != null &&
      this.registerForm.value.agreeTermsAndConditions != null &&
      this.registerForm.value.city != null &&
      this.registerForm.value.dob != null &&
      this.registerForm.value.email != null &&
      this.registerForm.value.firstName != null &&
      this.registerForm.value.houseNo != null &&
      this.registerForm.value.lastName != null &&
      this.registerForm.value.password != null &&
      this.registerForm.value.phone != null &&
      this.registerForm.value.pincode != null &&
      this.registerForm.value.state != null
    ) {
      let formData: FormData = new FormData();
      let gender = (document.getElementById('male') as HTMLInputElement).checked;
      formData.set('gender', gender ? 'male' : 'female');
      formData.set('phone', this.registerForm.value.phone);
      formData.set('dob', this.registerForm.value.dob);
      formData.set('name', this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName);
      formData.set('email', this.registerForm.value.email);
      formData.set('password', this.registerForm.value.password);
      formData.set('houseNo', this.registerForm.value.houseNo);
      formData.set('addressLine1', this.registerForm.value.addressLine1);
      formData.set('addressLine2', this.registerForm.value.addressLine2);
      formData.set('city', this.registerForm.value.city);
      formData.set('state', this.registerForm.value.state);
      formData.set('pincode', this.registerForm.value.pincode);
      this.userAuthService.register(formData).subscribe({
        next: (data) => {
          this.successStatus = true;
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.failedStatus = true;
        },
      });
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
