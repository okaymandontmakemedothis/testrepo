import { Injectable } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { HotkeysFichierService } from 'src/app/services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from 'src/app/services/hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from 'src/app/services/hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from 'src/app/services/hotkeys/hotkeys-travail/hotkeys-travail.service';
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
    private toolService: ToolsService,
    private hotkeyOutil: HotkeysOutilService,
    private hotkeyFichierService: HotkeysFichierService,
    private hotkeySelectionService: HotkeysSelectionService,
    private hotkeyTravailService: HotkeysTravailService,
  ) { this.eventListenerOnInput(); }

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
        this.hotkeyOutil.canExecute = false;
        this.hotkeyFichierService.canExecute = false;
        this.hotkeySelectionService.canExecute = false;
        this.hotkeyTravailService.canExecute = false;
      } else if (this.canClick) {
        this.hotkeyOutil.canExecute = true;
        this.hotkeyFichierService.canExecute = true;
        this.hotkeySelectionService.canExecute = true;
        this.hotkeyTravailService.canExecute = true;
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
