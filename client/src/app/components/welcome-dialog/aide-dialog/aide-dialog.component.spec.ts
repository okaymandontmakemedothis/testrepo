import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app.material-modules';
import { IndexService } from 'src/app/services/index/index.service';
import { AideDialogComponent } from './aide-dialog.component';

describe('AideDialogComponent', () => {
  let component: AideDialogComponent;
  let fixture: ComponentFixture<AideDialogComponent>;
  let indexServiceSpy: SpyObj<IndexService>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  beforeEach(() => {
    indexServiceSpy = jasmine.createSpyObj('IndexService', ['aideGet']);
    indexServiceSpy.aideGet.and.returnValue(of({
      O: '', S: '', G: '', E: '', X: '', C: '', V: '', D: '',
      Sup: '', A: '', Z: '', ShiftZ: '', Cray: '', W: '', P: '', Y: '', Aer: '', Rec: '', Ell: '', Poly: '',
      L: '', T: '', R: '', B: '', Eff: '', I: '', Sel: '', Gri: '', M: '', Aug: '', Dim: ''
    }));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModules, BrowserAnimationsModule],
      declarations: [AideDialogComponent],
      providers: [
        AideDialogComponent, { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: IndexService, useValue: indexServiceSpy }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create aide-dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});