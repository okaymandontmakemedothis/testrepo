import { Injectable, Renderer2, ElementRef } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { BrushToolService } from './brush-tool/brush-tool.service';
import { ITools } from './ITools';
import { PencilToolService } from './pencil-tool/pencil-tool.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';
import { ToolEllipseService } from './tool-ellipse/tool-ellipse.service';
import { PipetteToolService } from './pipette-tool/pipette-tool.service';

/// Service permettant de gérer l'outil présent selon son ID
/// Appelle les bonnes fonctions d'évenement souris selon l'outil selectionner

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  private isPressed = false;
  selectedToolId = 0;
  currentObject: null | ElementRef;
  tools: Map<number, ITools> = new Map<number, ITools>();

  constructor(
    private drawing: DrawingService,
    private pencilTool: PencilToolService,
    private brushTool: BrushToolService,
    private colorApplicator: ToolsApplierColorsService,
    private rectangleTool: ToolRectangleService,
    private ellipseTool: ToolEllipseService,
    private pipetteTool: PipetteToolService,

  ) {
    this.initTools();
  }

  /// Initialiser la liste d'outil
  private initTools(): void {
    this.tools.set(this.pencilTool.id, this.pencilTool);
    this.tools.set(this.brushTool.id, this.brushTool);
    this.tools.set(this.colorApplicator.id, this.colorApplicator);
    this.tools.set(this.rectangleTool.id, this.rectangleTool);
    this.tools.set(this.ellipseTool.id, this.ellipseTool);
    this.tools.set(this.pipetteTool.id, this.pipetteTool);
  }

  /// Selectionner un outil avec son id
  selectTool(id: number): void {
    this.currentObject = null;
    this.selectedToolId = id;
  }

  /// Retourner l'outil presentement selectionné
  get selectedTool(): ITools | undefined {
    return this.tools.get(this.selectedToolId);
  }

  /// Appeller la fonction onPressed du bon outil et ajoute un objet au dessin si nécéssaire
  onPressed(event: MouseEvent): void {
    const tool = this.selectedTool;
    if (!tool) {
      return;
    }

    this.currentObject = tool.onPressed(event, this.drawing.renderer);
    this.isPressed = true;
    if (this.currentObject) {
      this.drawing.addObject(this.currentObject);
    }

  }

  /// Appelle la fonction onRelease du bon outil et annule les entrée d'évenement souris
  onRelease(event: MouseEvent): void {
    const tool = this.selectedTool;
    if (!tool) {
      return;
    }
    if (this.isPressed) {
      tool.onRelease(event, this.drawing.renderer);
      this.currentObject = null;
    }
    this.isPressed = false;

  }

  /// Appelle la fonction onMove du bon outil si les entrée d'évenement souris son activé
  onMove(event: MouseEvent): void {
    const tool = this.selectedTool;
    if (!tool) {
      return;
    }
    if (this.isPressed) {
      tool.onMove(event, this.drawing.renderer);
    }

  }

}
