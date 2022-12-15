import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  private hasView = false;

  constructor(private _viewContainer: ViewContainerRef,private templateRef: TemplateRef<any>) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this._viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this._viewContainer.clear();
      this.hasView = false;
    }
  }
}