import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
@Component({
  selector: 'app-root', // HTML tarafındaki etiketi tanımlar
  templateUrl: './app.component.html', // Hangi HTML dosyasını kullanacağını belirtir
  styleUrls: ['./app.component.scss'], // Hangi CSS dosyasını/dosyalarını kullanacağını belirtir
})
export class AppComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}

  isLoading: boolean = false;
  isLoadingText!: string;
  // Loading.service'den çekip,değerini değiştirmek istiyorum.
  ngOnInit(): void {
    this.subscribeToLoading();
    this.subscribeToLoadingText();
  }

  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }


  subscribeToLoadingText(){
    this.loadingService.text.subscribe((isLoadingText)=>{
      this.isLoadingText = isLoadingText;
    })
  }
}
