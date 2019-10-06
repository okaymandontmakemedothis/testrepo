import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[etampe]'
})
export class MouseWheelDirective {
    @Output() mouseWheelUp = new EventEmitter();
    @Output() mouseWheelDown = new EventEmitter();

    @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
        this.mouseWheelFunc(event);
    }

    @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
        this.mouseWheelFunc(event);
    }

    @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
        this.mouseWheelFunc(event);
    }

    mouseWheelFunc(event: any) {
        event = window.event;
        const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if (delta > 0) {
            this.mouseWheelUp.emit(event);
            console.log('up');

        } else if (delta < 0) {
            this.mouseWheelDown.emit(event);
            console.log('down');
        }
    }
}

