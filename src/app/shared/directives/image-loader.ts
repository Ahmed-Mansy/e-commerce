import { AfterViewInit, Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImageLoader]'
})
export class ImageLoader implements AfterViewInit {
  private readonly renderer = inject(Renderer2)
  private readonly el = inject(ElementRef)

  private get parent(): HTMLElement {
    return this.el.nativeElement.parentElement;
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.parent, 'loading');
  }

  @HostListener('load')
  onLoad(): void {
    this.renderer.removeClass(this.parent, 'loading');
    this.renderer.addClass(this.el.nativeElement, 'show')
  }

  @HostListener('error')
  onError(): void {
    this.renderer.removeClass(this.parent, 'loading');
    this.renderer.addClass(this.parent, 'error');
  }
}
