import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Eğer uygulamada o an bir request gönderilmiş ve cevap bekleniyorsa, uygulama loading ekranı
    // göstersin..
    console.log('Loading started');
    // Cevap geldiğinde => loading stopped
    // rxjs
    //! TODO: Add Loading Event
    return next.handle(request).pipe(
      finalize(() => {
        // requestin response döndüğünü ve sonlandığını ele alan fonksiyon
        console.log('request bittiğinde çalışacak fonksiyon');
      })
    );
  }
}
