import { Injectable } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { ToggleDrawerService } from '../toggle-drawer/toggle-drawer.service';
import { ITools } from '../tools/ITools';
import { ToolsService } from '../tools/tools.service';
import { HotkeysOutilService } from 'src/app/services/hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysFichierService } from 'src/app/services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysSelectionService } from 'src/app/services/hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from 'src/app/services/hotkeys/hotkeys-travail/hotkeys-travail.service';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {

  isControlMenu = false;
  canClick = false;

  constructor(private toggleDrawerService: ToggleDrawerService, private toolService: ToolsService,
    private hotkeyOutil: HotkeysOutilService,
    private hotkeya: HotkeysFichierService,
    private hotkeyb: HotkeysSelectionService,
    private hotkeyc: HotkeysTravailService) { this.eventListenerOnInput(); }

  get toolList(): ITools[] {
    return this.toolService.tools;
  }

  get isOpened(): boolean {
    return this.toggleDrawerService.isOpened;
  }

  get selectedParameter(): number {
    if (this.isControlMenu) {
      return this.toolList.length;
    }
    return this.toolService.selectedToolId;
  }

  private eventListenerOnInput() {
    window.addEventListener('mousedown', (event) => {
      if ((event.target as HTMLInputElement).value !== undefined) {
        this.hotkeyOutil.canExecute = false;
        this.hotkeya.canExecute = false;
        this.hotkeyb.canExecute = false;
        this.hotkeyc.canExecute = false;
      } else if (this.canClick) {
        this.hotkeyOutil.canExecute = true;
        this.hotkeya.canExecute = true;
        this.hotkeyb.canExecute = true;
        this.hotkeyc.canExecute = true;
      }
    });
  }

  open(): void {
    this.toggleDrawerService.open();
  }

  close(): void {
    this.toggleDrawerService.close();
    this.isControlMenu = false;
  }

  selectionChanged(selectedItem: MatButtonToggleChange): void {
    this.toolService.selectTool(selectedItem.value);
    this.isControlMenu = false;
  }

  openControlMenu(): void {
    this.isControlMenu = true;
    this.open();
  }
}
