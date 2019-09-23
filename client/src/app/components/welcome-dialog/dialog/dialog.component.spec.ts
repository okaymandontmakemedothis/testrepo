import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCheckboxModule, MatDialog, MatDialogRef, MatTabsModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { IndexService } from '../../../services/index/index.service';
import { DialogComponent } from './dialog.component';
import SpyObj = jasmine.SpyObj;

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let indexServiceSpy: SpyObj<IndexService>;

  beforeEach(() => {
    indexServiceSpy = jasmine.createSpyObj('IndexService', ['welcomeGet']);
    indexServiceSpy.welcomeGet.and.returnValue(of({ body: '', end: '' }));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialog,
        MatDialogRef,
        MatCheckboxModule,
        MatTabsModule,
      ],
      declarations: [
        DialogComponent,
      ],
      providers: [
        DialogComponent,
        { provide: IndexService, useValue: indexServiceSpy }],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call open Dialog when aide button is clicked', fakeAsync(() => {
    spyOn(component, 'openDialog').and.callThrough();
    const aideButton = fixture.debugElement.query(By.css('button'));
    aideButton.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalled();
  }));
});
