import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: `<button class="btn" (click)="logout()">Logout</button>`,
  styles: [
  ]
})
export class LogoutComponent {
  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter();

  logout(){
    let credentials = localStorage.getItem('cred');
    if(credentials!=null){
      localStorage.removeItem('cred');
    }
    this.logoutEmitter.emit();
  }
}
