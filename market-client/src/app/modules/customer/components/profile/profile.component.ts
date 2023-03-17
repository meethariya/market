import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from '../../services/customer.service';
import { faPencil, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  customer!: Customer;
  pencil = faPencil;
  cancel = faXmark;
  check = faCheck;
  profilePicture: string | null = null;
  image: any = null;
  editSuccess = false;
  editError = false;
  errorMessage: string = '';

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

  ngOnInit(): void {
    this.customerService.getProfile().subscribe({
      next: (data) => {
        this.customer = data;
        this.setFormData(data);
      },
      error: (err) => console.log(err),
    });
  }

  editProfile() {
    document.getElementById('onEdit')!.style.display = 'block';
    document.getElementById('editButton')!.style.display = 'none';
    this.readonlyModifier(false);
  }

  cancelEdit() {
    document.getElementById('onEdit')!.style.display = 'none';
    document.getElementById('editButton')!.style.display = 'block';
    this.readonlyModifier(true);
    this.setFormData();
  }

  submitForm() {
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

      let gender = (
        document.querySelector(
          'input[name="gender"]:checked'
        ) as HTMLInputElement
      ).value;
      data.set('gender', gender);

      if (this.profilePicture != null) {
        data.append('images', this.image);
      }

      this.customerService.editProfile(this.customer.id, data).subscribe({
        next: (customerData) => {
          this.customer = customerData;
          this.setFormData(customerData);
          this.editSuccess = true;
          document.getElementById('cancel')!.click();
        },
        error: (err) => {
          this.editError = true;
          this.errorMessage = err.error;
        },
      });
    }
  }

  readonlyModifier(value: boolean) {
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
      this.profilePicture = null;
      document.getElementById('profilePicEditButton')!.style.display = 'none';
    } else {
      temp = {
        readOnly: false,
        originalClassName: '.form-control-plaintext',
        changeToClassName: 'form-control',
      };
      document.getElementById('profilePicEditButton')!.style.display = 'block';
    }

    let elements = document.querySelectorAll(temp.originalClassName);
    elements.forEach((e) => {
      if (e.id !== 'email') {
        (e as HTMLInputElement).readOnly = temp.readOnly;
        e.className = temp.changeToClassName;
      }
    });

    let genderElements = document.querySelectorAll('.form-check-input');
    genderElements.forEach(
      (e) => ((e as HTMLInputElement).disabled = temp.readOnly)
    );
  }

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

  get f() {
    return this.formData.controls;
  }

  setFormData(customer?: Customer) {
    if (customer == null) customer = this.customer;

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
}
