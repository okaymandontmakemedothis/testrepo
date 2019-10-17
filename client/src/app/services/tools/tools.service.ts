import { Injectable } from '@angular/core';
import { BrushToolService } from './brush-tool/brush-tool.service';
import { EtampeToolService } from './etampe-tool/etampe-tool.service';
import { GridService } from './grid-tool/grid.sevice';
import { ITools } from './ITools';
import { LineToolService } from './line-tool/line-tool.service';
import { PencilToolService } from './pencil-tool/pencil-tool.service';
import { PipetteToolService } from './pipette-tool/pipette-tool.service';
import { ToolEllipseService } from './tool-ellipse/tool-ellipse.service';
import { ToolIdConstants } from './tool-id-constants';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';

/// Service permettant de gérer l'outil présent selon son ID
/// Appelle les bonnes fonctions d'évenement souris selon l'outil selectionner

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  private isPressed = false;
  selectedToolId = 0;
  tools: Map<number, ITools> = new Map<number, ITools>();

  constructor(
    private pencilTool: PencilToolService,
    private brushTool: BrushToolService,
    private colorApplicator: ToolsApplierColorsService,
    private rectangleTool: ToolRectangleService,
    private ellipseTool: ToolEllipseService,
    private pipetteTool: PipetteToolService,
    private etampeService: EtampeToolService,
    private gridService: GridService,
    private lineTool: LineToolService,

  ) {
    this.initTools();
    this.onKeyTriggered();
  }

  /// Initialiser la liste d'outil
  private initTools(): void {
    this.tools.set(this.pencilTool.id, this.pencilTool);
    this.tools.set(this.brushTool.id, this.brushTool);
    this.tools.set(this.colorApplicator.id, this.colorApplicator);
    this.tools.set(this.rectangleTool.id, this.rectangleTool);
    this.tools.set(this.ellipseTool.id, this.ellipseTool);
    this.tools.set(this.lineTool.id, this.lineTool);
    this.tools.set(this.pipetteTool.id, this.pipetteTool);
    this.tools.set(this.etampeService.id, this.etampeService);
    this.tools.set(this.gridService.id, this.gridService);
    this.tools.set(this.lineTool.id, this.lineTool);
  }

  /// Selectionner un outil avec son id
  selectTool(id: number): void {
    this.selectedToolId = id;
    this.lineTool.changeTool();
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

    tool.onPressed(event);
    this.isPressed = true;
  }

  /// Appelle la fonction onRelease du bon outil et annule les entrée d'évenement souris
  onRelease(event: MouseEvent): void {
    const tool = this.selectedTool;
    if (!tool) {
      return;
    }
    if (this.isPressed || tool.id === ToolIdConstants.LINE_ID) {
      tool.onRelease(event);
    }
    this.isPressed = false;

  }

  /// Appelle la fonction onMove du bon outil si les entrée d'évenement souris son activé
  onMove(event: MouseEvent): void {
    const tool = this.selectedTool;
    if (!tool) {
      return;
    }
    if (this.isPressed || tool.id === ToolIdConstants.LINE_ID) {
      tool.onMove(event);
    }
  }

  onKeyTriggered(): void {
    window.addEventListener('keydown', (event) => {
      const tool = this.selectedTool;
      if (!tool) {
        return;
      }
      if (this.isPressed || tool.id === ToolIdConstants.LINE_ID) {
        tool.onKeyDown(event);
      }
    });
    window.addEventListener('keyup', (event) => {
      const tool = this.selectedTool;
      if (!tool) {
        return;
      }
      if (this.isPressed || tool.id === ToolIdConstants.LINE_ID) {
        tool.onKeyUp(event);
      }
    });
  }

}
