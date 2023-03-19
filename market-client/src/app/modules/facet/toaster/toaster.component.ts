import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  faTriangleExclamation,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { Toast } from 'bootstrap';

/**
 * Toaster Component.  
 * This component is responsible pushing toasts notifications when any message has to be
 * shown to user. Used by both customer and Manager.  
 * Uses {@link Toast} from `bootstrap`.  
 * Uses {@link colorClass} to change toast color.  
 * Uses {@link title} to change toast title.  
 * Uses {@link message} to change toast message.  
 * Uses {@link ready} to show/hide toast.  
 */
@Component({
  selector: 'app-toaster',
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        class="toast text-bg-{{ colorClass }}"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-autohide="true"
      >
        <div class="toast-header">
          <fa-icon
            class="me-2"
            [icon]="colorClass === 'success' ? success : error"
          ></fa-icon>
          <strong class="me-auto">{{ title }}</strong>
          <small>0 mins ago</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">{{ message }}</div>
      </div>
    </div>
  `,
  styles: [],
})
export class ToasterComponent implements OnChanges {
  @Input() title!: string;          // title
  @Input() colorClass!: string;     // toast color
  @Input() message!: string;        // message
  @Input() ready: boolean = false;  // whether toast is ready to be shown

  // emit when toast is hidden
  @Output() setReadyFalse: EventEmitter<void> = new EventEmitter();

  error = faTriangleExclamation;    // Error Icon
  success = faThumbsUp;             // Success Icon

  /**
   * When any input from parent component has changed, this method is called.  
   * If the changed component is {@link ready}, and it's true, the toast is shown.  
   * {@link showToast()}
   * @param changes 
   * @returns `void`
   */
  ngOnChanges(changes: SimpleChanges): void {
    for (const change in changes) {
      if (change === 'ready' && this.ready) this.showToast();
    }
  }

  /**
   * Shows the toast message.  
   * When the toast is hidden wither by user or automatically, emits to parent.
   * @returns `void`
   */
  showToast() {
    const myToastEl = document.getElementById('liveToast')!;
    new Toast(myToastEl).show();
    myToastEl.addEventListener('hidden.bs.toast', () =>
      this.setReadyFalse.emit()
    );
  }
}
