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
  @Input() title!: string;
  @Input() colorClass!: string;
  @Input() message!: string;
  @Input() ready: boolean = false;
  @Output() setReadyFalse: EventEmitter<void> = new EventEmitter();

  error = faTriangleExclamation;
  success = faThumbsUp;

  ngOnChanges(changes: SimpleChanges): void {
    for (const change in changes) {
      if (change === 'ready' && this.ready) this.showToast();
    }
  }

  showToast() {
    const myToastEl = document.getElementById('liveToast')!;
    new Toast(myToastEl).show();
    myToastEl.addEventListener('hidden.bs.toast', () =>
      this.setReadyFalse.emit()
    );
  }
}
