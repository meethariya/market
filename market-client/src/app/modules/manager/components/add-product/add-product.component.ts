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
  successAdded: boolean = false;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    brand: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    category: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    images: new FormControl('', [Validators.required]),
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
      formData.set('brand', this.productForm.value.brand===" "?"BigMart":this.productForm.value.brand);
      formData.set('categoryName', this.productForm.value.category);
      formData.set('price', this.productForm.value.price);

      for (let i = 0; i < this.productImages.length; i++) {
        formData.append('images', this.productImages[i]);
      }

      this.managerService.addProduct(formData).subscribe({
        next: (i) => console.log(i),
        error: (err) => console.log(err),
      });

      this.successAdded=true;
      this.productForm.reset();

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
}
