import { Injectable } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { HotkeysService } from '../hotkeys/hotkeys.service';
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
  canClick = false;

  constructor(
    private toggleDrawerService: ToggleDrawerService,
    private hotkeysService: HotkeysService,
    private toolService: ToolsService,
  ) {
    this.eventListenerOnInput();
    this.hotkeysService.hotkeysListener();
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

  /// Verifie si on doit appeller les hotkeys
  private eventListenerOnInput() {
    window.addEventListener('mousedown', (event) => {
      if ((event.target as HTMLInputElement).value !== undefined) {
        this.hotkeysService.disableHotkeys();
      } else if (this.canClick) {
        this.hotkeysService.enableHotkeys();
      }
    });
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
