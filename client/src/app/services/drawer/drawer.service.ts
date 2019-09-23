import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
 drawerheight: string; // pouvoir l'injecter dans le html
 drawerwidth: string;

 height = 300;
 width = 300;

/*constructor(height:string,width:string) {
    this.drawerheight = height;
    this.drawerwidth = width;
 }*/
/*
constructor(height : number, width : number){
  this.drawerheight = height + 'px';
  this.drawerwidth = width + 'px';
}
*/

constructor() {

 this.drawerheight = this.height + 'px';

 this.drawerwidth = this.width + 'px';

}

}
