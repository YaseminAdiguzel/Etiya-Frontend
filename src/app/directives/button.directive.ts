import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit{
  @Input() appButton!: "btn-primary" | "btn-dark" | "btn-secondary";

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.appButton);
  }


  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.classList.remove(this.appButton)
    this.el.nativeElement.classList.add("btn-secondary");
    this.appButton = "btn-secondary";
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.classList.remove(this.appButton)
    this.el.nativeElement.classList.add("btn-dark");
    this.appButton = "btn-dark";
  }
}