import { Injectable } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { ToggleDrawerService } from '../toggle-drawer/toggle-drawer.service';
import { ITools } from '../tools/ITools';
import { ToolsService } from '../tools/tools.service';

/// Service permettant au sidenav de bien interagir avec les hotkeys et de bien gerer
/// sa selection d'outil. Vérifie aussi s'il s'agit du menu fichier ou d'outil
@Injectable({
  providedIn: 'root',
})
export class SidenavService {

  isControlMenu = false;

  constructor(
    private toggleDrawerService: ToggleDrawerService,
    private toolService: ToolsService,
  ) {
  }

  /// Retourne la liste d'outils
  get toolList(): Map<number, ITools> {
    return this.toolService.tools;
  }

  /// Retourne si le drawer est ouvert
  get isOpened(): boolean {
    return this.toggleDrawerService.isOpened;
  }

  /// Retourne un indexe detourner pour le numero d'outil choisi
  get selectedParameter(): number {
    if (this.isControlMenu) {
      return this.toolList.size;
    }
    return this.toolService.selectedToolId;
  }

  /// Ouvre le drawer de paramètre
  open(): void {
    this.toggleDrawerService.open();
  }

  /// Ferme le drawer de paramètre
  close(): void {
    this.toggleDrawerService.close();
    this.isControlMenu = false;
  }

  /// Change la selection d'outil
  selectionChanged(selectedItem: MatButtonToggleChange): void {
    this.toolService.selectTool(selectedItem.value);
    this.isControlMenu = false;
  }

  /// Défini une ouverture de menu d'option fichier
  openControlMenu(): void {
    this.isControlMenu = true;
    this.open();
  }
}
