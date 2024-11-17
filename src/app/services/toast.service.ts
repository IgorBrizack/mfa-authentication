import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<{ message: string; isError: boolean }>();
  toastState$ = this.toastSubject.asObservable();

  showError(message: string) {
    this.toastSubject.next({ message, isError: true });
  }

  showSuccess(message: string) {
    this.toastSubject.next({ message, isError: false });
  }
}
