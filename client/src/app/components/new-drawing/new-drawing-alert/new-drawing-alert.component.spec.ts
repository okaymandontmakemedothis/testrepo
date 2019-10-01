import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { NewDrawingAlertComponent } from './new-drawing-alert.component';

describe('NewDrawingAlertComponent', () => {
  let component: NewDrawingAlertComponent;
  let fixture: ComponentFixture<NewDrawingAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewDrawingAlertComponent],
      imports: [MatDialogModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
