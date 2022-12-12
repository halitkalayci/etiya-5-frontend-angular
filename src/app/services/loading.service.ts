import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // Loading servisten text isminde bir veri taşınmalıdır. string
  // Bu text input ile app.component'den overlay-loading'e taşınmalıdır.
  // Bu text ise overlay-loading'de gösterilmelidir.

  // Subject konusu
  // Subject, BehaviorSubject => BehaviorSubject başlangıç değeri ister!
  constructor() {}

  startLoading(text = 'Loading...') {
    this.isLoadingSubject.next(true);
    // next()
  }

  stopLoading() {
    setTimeout(() => {
      this.isLoadingSubject.next(false);
    }, 3000);
  }
}
