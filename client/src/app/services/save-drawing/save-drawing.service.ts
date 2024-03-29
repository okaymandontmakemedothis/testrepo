import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { Drawing } from '../../../../../common/communication/drawing';
import { ErrorMessageService } from '../error-message/error-message.service';
import { SaveRequestService } from '../save-request/save-request.service';
import { TagService } from '../tag/tag.service';
import { GridService } from '../tools/grid-tool/grid.service';

/// Service s'occuppant de la gestion de l'enregistrement du dessin sur le serveur
@Injectable({
  providedIn: 'root',
})
export class SaveDrawingService {
  tagCtrl = new FormControl();
  nameCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  saveEnabled = true;

  constructor(
    private drawingService: DrawingService,
    private gridService: GridService,
    private tagService: TagService,
    private saveRequestService: SaveRequestService,
    private errorMessage: ErrorMessageService,
  ) {
    this.nameCtrl.setValidators([Validators.required]);
    this.reset();
  }

  /// Retourne tout les tags
  getAllTags(): string[] {
    return this.allTags;
  }

  /// Réinitialise les information de save-drawing
  reset(): void {
    this.tagCtrl.reset();
    this.nameCtrl.reset();
    this.tags = [];
    this.tagService.retrieveTags().subscribe((tags: string[]) => this.allTags = tags);
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filter(tag) : this.allTags.slice()));
  }

  /// Ajoute un tag dans la list de tag choisi
  add(event: MatChipInputEvent, isMatAutoCompleteOpen: boolean): void {
    if (!isMatAutoCompleteOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim() && !this.tags.includes(value.trim())) {
        this.tags.push(value.trim());

      }
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  /// Retrait d'un tag
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  /// Selection d'un tag
  selected(tagValue: string): void {
    this.tags.push(tagValue);
    this.tagCtrl.setValue(null);
  }

  /// Filtrer les tag pour avoir seulement un de chaque
  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  /// Sauvegarder le dessins sur le serveur
  async save(): Promise<boolean> {
    this.saveEnabled = false;
    if (this.gridService.activerGrille.value) {
      this.gridService.hideGrid();
    }
    const drawing: Drawing = {
      id: this.drawingService.id,
      name: this.nameCtrl.value,
      tags: this.tags,
      width: this.drawingService.width,
      height: this.drawingService.height,
      backGroundColor: { rgb: this.drawingService.color, a: this.drawingService.alpha },
      svg: this.drawingService.drawing.innerHTML,
    };
    if (this.gridService.activerGrille.value) {
      this.gridService.showGrid();
    }
    try {
      await this.saveRequestService.addDrawing(drawing);
    } catch {
      this.errorMessage.showError('Test', 'Erreur de sauvegarde de dessin sur le serveur');
      this.saveEnabled = true;
      return false;
    }
    this.saveEnabled = true;
    this.drawingService.saved = true;
    return true;
  }
}
