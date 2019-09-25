import { Component } from '@angular/core';
import { ToggleDrawerService } from 'src/app/services/menu/toggle-drawer.service';
// import { FaIcons } from 'src/assets/assets.icons';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { ITools } from 'src/app/services/tools/ITools';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {

  constructor(private toggleDrawerService: ToggleDrawerService, private toolService: ToolsService) {
  }

  // menuTopIconList = FaIcons.menuTopIconList;
  // menuBottomIconList = FaIcons.menuBottomIconList;

  selectedTool: number;

  toggle() {
    this.toggleDrawerService.toggle();
  }

  ngOnInit(): void {
    this.selectedTool = this.toolService.selectedTools.id;
  }

  selectionChanged(selectedItem: MatButtonToggleChange): void {
    console.log(selectedItem.value);
    this.toolService.selectTool(selectedItem.value);
    console.log(this.toolService.selectedTools.id);
  }

  get toolList(): ITools[] {
    return this.toolService.tools;
  }
}
