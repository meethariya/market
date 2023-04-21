import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from '../../services/customer.service';
import { faPencil, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterComponent } from 'src/app/modules/facet/toaster/toaster.component';
import { MyReviewsComponent } from '../my-reviews/my-reviews.component';
import { environment } from 'src/environments/environment';
/**
 * Profile component. This component displays customer `profile details`
 * and all the `reviews` submmited by the customer.  
 * It allows customer to `modify` the profile details and also modify or `delete` reviews.
 * @see {@link MyReviewsComponent}
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  customer!: Customer;                      // Customer details
  pencil = faPencil;                        // Edit Icon
  cancel = faXmark;                         // Cancel Icon
  check = faCheck;                          // Submit Icon
  profilePicture: string | null = null;     // Profile pic url when image is uploaded
  image: any = null;                        // Image source
  seperator = environment.seperator;      // seperator based on OS
  // toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  formData = new FormGroup({
    gender: new FormControl(''),
    phone: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
    ]),
    dob: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
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
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  constructor(private customerService: CustomerService) {}

  /**
   * Loads Customer details using {@link CustomerService.getProfile()}  
   * Sets all form fields form {@link formData}  
   * Shoes toast status and message when error is encountered using {@link ToasterComponent}
   * @returns `void`
   */
  ngOnInit(): void {
    this.customerService.getProfile().subscribe({
      // on success
      next: (data) => {
        this.customer = data;
        this.setFormData(data);
      },
      // on failure
      error: (err) => this.toastLoader(false, err.error),
    });
  }

  /**
   * Enables user to modify all fields.  
   * This method is called when {@link pencil} is clicked.  
   * Hides itselfs and displays {@link cancel} and {@link check} buttons.
   * @returns `void`
   */
  editProfile(): void {
    document.getElementById('onEdit')!.style.display = 'block';
    document.getElementById('editButton')!.style.display = 'none';
    this.readonlyModifier(false);
  }

  /**
   * Disables user to modify all fields.
   * This method is called when {@link cancel} is clicked.  
   * Hides {@link cancel} and {@link check} buttons and displays {@link pencil} button.  
   * Resets all form fields.
   * @returns `void`
   */
  cancelEdit(): void {
    document.getElementById('onEdit')!.style.display = 'none';
    document.getElementById('editButton')!.style.display = 'block';
    this.readonlyModifier(true);
    this.setFormData();
  }

  /**
   * Submits the modified customer profile data using {@link CustomerService.editProfile()}.  
   * This method is called when {@link check} is clicked.  
   * Validates all the form fields. Adds new profile image **if** uploaded to {@link image}.  
   * Shows toast status and message on success/failure using {@link ToasterComponent}.  
   * Modifes {@link customer} on success update.    
   * Clicks {@link cancel} button.
   * @returns `void`
   */
  submitForm(): void {
    if (
      this.formData.value.addressLine1 != null &&
      this.formData.value.city != null &&
      this.formData.value.dob != null &&
      this.formData.value.houseNo != null &&
      this.formData.value.name != null &&
      this.formData.value.phone != null &&
      this.formData.value.pincode != null &&
      this.formData.value.state != null
    ) {
      let data = new FormData();
      data.set('addressLine1', this.formData.value.addressLine1);
      if (this.formData.value.addressLine2 != null)
        data.set('addressLine2', this.formData.value.addressLine2);
      data.set('city', this.formData.value.city);
      data.set('dob', this.formData.value.dob);
      data.set('houseNo', this.formData.value.houseNo);
      data.set('name', this.formData.value.name);
      data.set('phone', this.formData.value.phone);
      data.set('pincode', this.formData.value.pincode);
      data.set('state', this.formData.value.state);

      // gender radio button value
      let gender = (
        document.querySelector(
          'input[name="gender"]:checked'
        ) as HTMLInputElement
      ).value;
      data.set('gender', gender);

      // profile image **if** uploaded.
      if (this.profilePicture != null) {
        data.append('images', this.image);
      }

      this.customerService.editProfile(this.customer.id, data).subscribe({
        // on success
        next: (customerData) => {
          this.customer = customerData;
          this.setFormData(customerData);
          document.getElementById('cancel')!.click();
          this.toastLoader(true,"Profile has been updated.")
        },
        // on failure
        error: (err) => {
          this.toastLoader(false, err.error);
        },
      });
    }
  }

  /**
   * Toggles all form fields readOnly based on {@link value}.
   * @param value 
   */
  readonlyModifier(value: boolean): void {
    // bootstrap class template
    let temp: {
      readOnly: boolean;
      originalClassName: string;
      changeToClassName: string;
    };
    if (value) {
      temp = {
        readOnly: true,
        originalClassName: '.form-control',
        changeToClassName: 'form-control-plaintext',
      };
      // dont show add profile pic button
      this.profilePicture = null;
      document.getElementById('profilePicEditButton')!.style.display = 'none';
    } else {
      temp = {
        readOnly: false,
        originalClassName: '.form-control-plaintext',
        changeToClassName: 'form-control',
      };
      // show add profile pic button
      document.getElementById('profilePicEditButton')!.style.display = 'block';
    }
    
    // Modify all other form fields
    let elements = document.querySelectorAll(temp.originalClassName);
    elements.forEach((e) => {
      if (e.id !== 'email') {
        (e as HTMLInputElement).readOnly = temp.readOnly;
        e.className = temp.changeToClassName;
      }
    });

    // Gender radio button
    let genderElements = document.querySelectorAll('.form-check-input');
    genderElements.forEach(
      (e) => ((e as HTMLInputElement).disabled = temp.readOnly)
    );
  }

  /**
   * When image is being uploaded. It is saved to {@link profilePicture} as string
   * and as image to {@link image}
   * @param event 
   */
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.profilePicture = reader.result as string;
      };

      this.image = file;
    }
  }

  /**
   * @returns formData control details
   */
  get f() {
    return this.formData.controls;
  }

  /**
   * Sets all form fields using {@link customer} or {@link this.customer}.  
   * Converts date to string date acceptable by the `HTML date input`.  
   * 
   * @param customer 
   * @returns `void`
   */
  setFormData(customer?: Customer): void {
    // customer information
    if (customer == null) customer = this.customer;

    // date set
    let customerDob = new Date(customer.dob);
    let date: number | string = customerDob.getDate();
    if (date < 10) {
      date = '0' + date.toString();
    }

    let month: number | string = customerDob.getMonth() + 1;
    if (month < 10) {
      month = '0' + month.toString();
    }
    
    let stringDob = customerDob.getFullYear() + '-' + month + '-' + date;

    // form data value
    this.formData.setValue({
      gender: customer.gender ? 'male' : 'female',
      phone: customer.phone,
      dob: stringDob,
      name: customer.user.name,
      houseNo: customer.address.houseNo,
      addressLine1: customer.address.addressLine1,
      addressLine2: customer.address.addressLine2,
      city: customer.address.city,
      state: customer.address.state,
      pincode: customer.address.pincode.toString(),
    });
  }

  /**
   * Shows the toast using {@link ToasterComponent}.
   * @param status
   * @param message
   * @returns `void`
   */
  toastLoader(status:boolean, message:string): void {
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

  /**
   * Shows toast status and message from {@link MyReviewsComponent}.
   * @param data 
   * @returns `void`
   */
  reviewToToaster(data: {status: boolean, message: string}): void {
    this.toastLoader(data.status, data.message);
  }
}
