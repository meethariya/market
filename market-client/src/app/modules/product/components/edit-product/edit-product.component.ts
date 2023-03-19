import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

/**
 * Edit Product component.
 * This component is part of detail product. If the authenticated user is manager 
 * then user can get option to edit the product.  
 * Emits product details, status and message on success/failure.
 */
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: [],
})
export class EditProductComponent implements OnInit {
  @Input() product!: Product;         // product input from parent
  // emit status and message to parent.
  @Output() modifyProductEmitter: EventEmitter<{
    status: boolean;
    message: string;
    product?: Product;
  }> = new EventEmitter();

  productImages: string[] = [];       // product images uploaded by manager
  categories: string[] = [];          // list of categories to help manager

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

  /**
   * Fills category list using {@link ProductService.getCategory()}.  
   * Emits toast details on error.  
   * Fills product form using product details.
   * @returns `void`
   */
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

  /**
   * @returns form control
   */
  get f() {
    return this.productForm.controls;
  }

  /**
   * Validates form and submits it using {@link ProductService.editProduct()}.  
   * Uploads images only if it is uploaded.  
   * Emits status and message on success/failure update.  
   * Closes the edit Product modal
   * @returns `void`
   */
  submit(): void {
    // Validate form
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

      // If images are uploaded then add those.
      if (this.productImages.length > 0)
        for (const element of this.productImages)
          formData.append('images', element);

      this.productService.editProduct(this.product.id, formData).subscribe({
        // on success
        next: (p) => {
          this.product = p;
          this.modifyProductEmitter.emit({
            status: true,
            message: 'Product updated successfully',
            product: this.product,
          });
        },
        // on failure
        error: (err) =>
          this.modifyProductEmitter.emit({ status: false, message: err.error }),
      });
      // close modal
      document.getElementById('editProductModalCloseButton')?.click();
    }
  }

  /**
   * This method is called when any image is uploaded.  
   * It updates {@link productImages}.
   * @param event 
   * @returns `void`
   */
  onImageChange(event: any): void {
    this.productImages = [];
    for (let i = 0; i < event.target!.files.length; i++) {
      this.productImages.push(event.target.files[i]);
    }
  }
}
