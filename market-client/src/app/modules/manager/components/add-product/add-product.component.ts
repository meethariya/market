import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: [],
})
export class AddProductComponent implements OnInit {
  productImages: string[] = [];
  categories: string[] = [];

  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    brand: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    category: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    images: new FormControl(''),
  });

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getCategory().subscribe({
      next: (p) =>
        (this.categories = p.map((c) => c.categoryName)),
      error: (err) => console.log(err),
    });
  }

  submit() {
    if (
      this.productForm.value.name != null &&
      this.productForm.value.brand != null &&
      this.productForm.value.category != null &&
      this.productForm.value.price != null
    ) {
      let formData = new FormData();

      formData.set('name', this.productForm.value.name);
      formData.set('brand', this.productForm.value.brand.trim()===""?"BigMart":this.productForm.value.brand);
      formData.set('categoryName', this.productForm.value.category);
      formData.set('price', this.productForm.value.price);

      for (const element of this.productImages) {
        formData.append('images', element);
      }

      this.managerService.addProduct(formData).subscribe({
        next: (i) => {
          this.toastLoader(true, "Product Added successfully");
          this.productForm.reset();
        },
        error: (err) => this.toastLoader(false, err.error),
      });

    }
  }

  onImageChange(event: any) {
    this.productImages = [];
    for (let i = 0; i < event.target!.files.length; i++) {
      this.productImages.push(event.target.files[i]);
    }
  }
  get f() {
    return this.productForm.controls;
  }

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
