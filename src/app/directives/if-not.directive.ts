import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngIfNot]',
})
export class IfNotDirective {
  // ViewContainerRef => direktifin uygulandığı elementin kendisi (parent)
  // TemplateRef => direktifin uygulandığı elementin altındaki elementler (childlar)
  constructor(
    private _viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input()
  set ngIfNot(condition: boolean) {
    // => gelen condition (boolean) false ise elemenları göster
    if (condition === false) {
      this._viewContainer.clear();
      this._viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
