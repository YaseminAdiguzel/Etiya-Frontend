import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-loading',
  templateUrl: './overlay-loading.component.html',
  styleUrls: ['./overlay-loading.component.scss']
})
export class OverlayLoadingComponent implements OnInit{
  ngOnInit(): void {
    this.log();
  }
  @Input() isLoadingText!:string;



  log(){
    console.log(this.isLoadingText);
  }

}