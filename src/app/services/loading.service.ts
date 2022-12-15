import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  text : Subject<string> = new Subject<string>();


  startLoading(text = 'Yükleniyor...') {
    this.isLoadingSubject.next(true);
    this.text.next(text);
  }

  stopLoading() {
    setTimeout(() => {
      this.isLoadingSubject.next(false);
    }, 3000);
  }
}