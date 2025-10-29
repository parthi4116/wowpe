import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[taskStatus]'
})
export class StatusDirective implements OnChanges {
  @Input() taskStatus: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.setColor(this.taskStatus);
  }

  setColor(status: string) {
    let color = '';
    
    switch (status ) {
      case 'Staterd':
        color = '#ff9800'; // orange
        break;
      case 'In Progress':
        color = '#2196f3'; // blue
        break;
      case 'Completed':
        color = '#4caf50'; // green
        break;
      case 'cancelled':
        color = '#f44336'; // red
        break;
      default:
        color = '#9e9e9e'; // grey
    }
this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
this.renderer.setStyle(this.el.nativeElement, 'padding', '4px 8px');
this.renderer.setStyle(this.el.nativeElement, 'border-radius', '6px');

  }
}
  