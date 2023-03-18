import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: [],
})
export class EditProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() modifyProductEmitter: EventEmitter<{
    status: boolean;
    message: string;
    product?: Product;
  }> = new EventEmitter();

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
  });

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategory().subscribe({
      next: (data) => (this.categories = data.map((c) => c.categoryName)),
      error: (err) => this.modifyProductEmitter.emit({ status: false, message: err.error }),
    });
    this.productForm.patchValue({
      name: this.product.name,
      brand: this.product.brand,
      category: this.product.category.categoryName,
      price: this.product.price.toString(),
    });
  }

  get f() {
    return this.productForm.controls;
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
      formData.set('brand', this.productForm.value.brand);
      formData.set('categoryName', this.productForm.value.category);
      formData.set('price', this.productForm.value.price);

      if (this.productImages.length > 0)
        for (const element of this.productImages)
          formData.append('images', element);

      this.productService.editProduct(this.product.id, formData).subscribe({
        next: (p) => {
          this.product = p;
          this.modifyProductEmitter.emit({
            status: true,
            message: 'Product updated successfully',
            product: this.product,
          });
        },
        error: (err) =>
          this.modifyProductEmitter.emit({ status: false, message: err.error }),
      });
      document.getElementById('editProductModalCloseButton')?.click();
    }
  }

  onImageChange(event: any) {
    this.productImages = [];
    for (let i = 0; i < event.target!.files.length; i++) {
      this.productImages.push(event.target.files[i]);
    }
  }
}
