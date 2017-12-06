import {Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShowTips]'
})
export class ShowTipsDirective {

  constructor(private el: ElementRef) {
  }

  @Input('appShowTips') showTips: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.appShowTips(this.showTips || 'grey');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.appShowTips(null);
  }

  private appShowTips(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
