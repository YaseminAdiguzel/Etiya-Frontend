import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngIfNot]'
})
export class IfNotDirective implements OnInit {

  private show = false;
  @Input() set ngIfNot(show: boolean) {
    this.show = show;
    this.displayTemplate();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.displayTemplate();
  }

  private displayTemplate() {
    this._viewContainer.clear();
    if (this.show) {
      this._viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
