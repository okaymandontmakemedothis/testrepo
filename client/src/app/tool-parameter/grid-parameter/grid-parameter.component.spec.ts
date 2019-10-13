import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridParameterComponent } from './grid-parameter.component';

describe('GridParameterComponent', () => {
  let component: GridParameterComponent;
  let fixture: ComponentFixture<GridParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridParameterComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
