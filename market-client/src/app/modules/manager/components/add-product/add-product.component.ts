import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { ToasterComponent } from 'src/app/modules/facet/toaster/toaster.component';
/**
 * Add Product Component. 
 * This component is responsible to add product.  
 * Toasts message on success/failure using {@link ToasterComponent}.  
 * App Route Link: `/manager/add-product`.
 */
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: [],
})
export class AddProductComponent implements OnInit {
  productImages: string[] = [];           // List of product images uploaded by manager
  categories: string[] = [];              // List of categories as an option list 

  // toast settings variables
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

  /**
   * Gets list of categories to fill {@link categories} using {@link ManagerService.getCategory()}.  
   * Shows toast on error.
   * @returns `void`
   */
  ngOnInit(): void {
    this.managerService.getCategory().subscribe({
      next: (p) =>
        (this.categories = p.map((c) => c.categoryName)),
      error: (err) => this.toastLoader(false, err.error),
    });
  }

  /**
   * Validates all the form fields and submits the form using {@link ManagerService.addProduct()}.  
   * Uploads image only **if** any are uploaded.  
   * Shows toast message on success/failure and resets the form on success.
   * @returns `void`
   */
  submit(): void {
    // validates form
    if (
      this.productForm.value.name != null &&
      this.productForm.value.brand != null &&
      this.productForm.value.category != null &&
      this.productForm.value.price != null
    ) {
      let formData = new FormData();

      formData.set('name', this.productForm.value.name);
      // if no brand is given, uses `BigMart` as default brand.
      formData.set('brand', this.productForm.value.brand.trim()===""?"BigMart":this.productForm.value.brand);
      formData.set('categoryName', this.productForm.value.category);
      formData.set('price', this.productForm.value.price);

      // adds images only if any are uploaded
      for (const element of this.productImages) {
        formData.append('images', element);
      }

      // submits form
      this.managerService.addProduct(formData).subscribe({
        // on success
        next: (i) => {
          this.toastLoader(true, "Product Added successfully");
          this.productForm.reset();
        },
        // on error
        error: (err) => this.toastLoader(false, err.error),
      });

    }
  }

  /**
   * When image input is modified, this method is called.  
   * It updates {@link productImages} with images that are uploaded.
   * @param event 
   * @returns `void`
   */
  onImageChange(event: any): void {
    this.productImages = [];
    for (let i = 0; i < event.target!.files.length; i++) {
      this.productImages.push(event.target.files[i]);
    }
  }

  /**
   * @returns form control
   */
  get f() {
    return this.productForm.controls;
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
}
