import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { BrushToolService } from './brush-tool/brush-tool.service';
import { ITools } from './ITools';
import { PencilToolService } from './pencil-tool/pencil-tool.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';
import { ToolEllipseService } from './tool-ellipse/tool-ellipse.service';
import { PipetteToolService } from './pipette-tool/pipette-tool.service';
import { EtampeToolService } from './etampe-tool/etampe-tool.service';

/// Service permettant de gérer l'outil présent selon son ID
/// Appelle les bonnes fonctions d'évenement souris selon l'outil selectionner

@Injectable({
  providedIn: 'root',
})
export class ToolsService {

  private isPressed = false;
  selectedToolId = 0;
  currentObject: null | IObjects;
  tools: ITools[] = [];

  constructor(
    private drawing: DrawingService,
    private pencilTool: PencilToolService,
    private brushTool: BrushToolService,
    private colorApplicator: ToolsApplierColorsService,
    private rectangleTool: ToolRectangleService,
    private ellipseTool: ToolEllipseService,
    private pipetteTool: PipetteToolService,
    private etampeService: EtampeToolService,

  ) {
    this.initTools();
  }

  /// Initialiser la liste d'outil
  private initTools(): void {
    this.tools.push(this.pencilTool);
    this.tools.push(this.brushTool);
    this.tools.push(this.colorApplicator);
    this.tools.push(this.rectangleTool);
    this.tools.push(this.ellipseTool);
    this.tools.push(this.pipetteTool);
    this.tools.push(this.etampeService);

  }

  /// Selectionner un outil avec son id
  selectTool(id: number): void {
    this.currentObject = null;
    this.selectedToolId = id;
  }

  /// Retourner l'outil presentement selectionné
  get selectedTool(): ITools {
    return this.tools[this.selectedToolId];
  }

  /// Appeller la fonction onPressed du bon outil et ajoute un objet au dessin si nécéssaire
  onPressed(event: MouseEvent): void {
    this.currentObject = this.selectedTool.onPressed(event);
    this.isPressed = true;
    if (this.currentObject) {
      this.drawing.addObject(this.currentObject);
    }
  }

  /// Appelle la fonction onRelease du bon outil et annule les entrée d'évenement souris
  onRelease(event: MouseEvent): void {
    if (this.isPressed) {
      this.selectedTool.onRelease(event);
      this.currentObject = null;
      this.drawing.draw();
    }
    this.isPressed = false;
  }

  /// Appelle la fonction onMove du bon outil si les entrée d'évenement souris son activé
  onMove(event: MouseEvent): void {
    if (this.isPressed) {
      this.selectedTool.onMove(event);
      this.drawing.draw();
    }
  }
}
