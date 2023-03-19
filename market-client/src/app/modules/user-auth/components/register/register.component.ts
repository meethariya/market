import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { ToasterComponent } from 'src/app/modules/facet/toaster/toaster.component';

/**
 * Register component.
 * Validates form and registers user. Checks for various backend validations as well.  
 * Uses {@link UserAuthService.register()}.  
 * Shows toast message on success/failure using {@link ToasterComponent}.
 */
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

  // toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

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
      // submits form
      this.userAuthService.register(formData).subscribe({
        next: (data) => this.toastLoader(true,"Account registered successfully. Login with your email and password"),
        error: (err) => this.toastLoader(false,err.error),
      });
    }
  }

  /**
   * @returns form control
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Shows the toast using {@link ToasterComponent}.
   * @param status
   * @param message
   * @returns `void`
   */
  toastLoader(status:boolean, message:string) {
    if (status) {
      this.toastTitle = 'Success';
      this.toastColorClass = 'success';
    } else {
      this.toastTitle = 'Failed';
      this.toastColorClass = 'danger';
    }
    this.toastMessage = message;
    this.toastReady = true;
  }
}
