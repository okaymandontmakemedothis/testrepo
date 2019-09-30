import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorOpacityComponent } from './color-opacity.component';

describe('ColorOpacityComponent', () => {
  let component: ColorOpacityComponent;
  let fixture: ComponentFixture<ColorOpacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorOpacityComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorOpacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not update the opacity and draw on the mouse move', () => {
    component.onMouseDown(new MouseEvent('mousedown'));
    const spy = spyOn(component, 'draw').and.callThrough();

    const event = new MouseEvent('mouseup');
    window.dispatchEvent(event);

    component.onMouseMove(new MouseEvent('mousemove'));

    expect(spy).not.toHaveBeenCalled();
  });

  it('should update the opacity and draw on the mouse move', () => {
    component.onMouseDown(new MouseEvent('mousedown'));
    const spy = spyOn(component, 'draw').and.callThrough();

    component.onMouseMove(new MouseEvent('mousemove'));

    expect(spy).toHaveBeenCalled();
  });

  it('should get the % of the opacity at the position x and return 0', () => {
    component.onMouseDown(new MouseEvent('mousedown', { clientX: -1 }));

    expect(component.a.value).toEqual(0);
  });

  it('should get the % of the opacity at the position x and return 1', () => {
    component.opacityCanvas.nativeElement.width = 50;
    component.onMouseDown(new MouseEvent('mousedown', { clientX: 100 }));

    expect(component.a.value).toEqual(1);
  });
});
