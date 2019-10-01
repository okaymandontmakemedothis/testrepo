import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app-material.module';
import { NewDrawingComponent } from './new-drawing.component';

describe('NewDrawingComponent', () => {
  let component: NewDrawingComponent;
  let fixture: ComponentFixture<NewDrawingComponent>;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    afterOpened: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModules, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [NewDrawingComponent],
      providers: [Overlay, MatSnackBar,
        { provide: MatDialogRef, useValue: dialogRefSpyObj }],
    });
    TestBed.compileComponents();
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new drawing component', () => {
    expect(component).toBeTruthy();
  });
});
