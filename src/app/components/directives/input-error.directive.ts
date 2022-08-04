import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputError]'
})
export class InputErrorDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('blur') onInputChange() {
    const inputField = this.el.nativeElement;
    const hasErrorClass = inputField.classList.contains('ng-invalid');
    hasErrorClass ? this.renderer.addClass(inputField, 'input-error') : this.renderer.removeClass(inputField, 'input-error');
  }

}
