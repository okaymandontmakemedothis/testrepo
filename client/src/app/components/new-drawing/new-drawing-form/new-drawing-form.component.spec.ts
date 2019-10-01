import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModules } from 'src/app/app-material.module';
import { NewDrawingFormComponent } from './new-drawing-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

describe('NewDrawingFormComponent', () => {
  let component: NewDrawingFormComponent;
  let fixture: ComponentFixture<NewDrawingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewDrawingFormComponent],
      imports: [MaterialModules,
        ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingFormComponent);
    component = fixture.componentInstance;
    component.sizeForm = new FormGroup(
      { width: new FormControl('10'), height: new FormControl('10') });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
