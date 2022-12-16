import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root', // HTML tarafındaki etiketi tanımlar
  templateUrl: './app.component.html', // Hangi HTML dosyasını kullanacağını belirtir
  styleUrls: ['./app.component.scss'], // Hangi CSS dosyasını/dosyalarını kullanacağını belirtir
})
export class AppComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}
  // title: string = 'Etiya 5 Frontend Angular'; // Property, State
  isLoading: boolean = false;
  // Loading.service'den çekip,değerini değiştirmek istiyorum.
  ngOnInit(): void {
    this.subscribeToLoading();
  }

  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      console.log(isLoading);
      this.isLoading = isLoading;
    });
  }
}
