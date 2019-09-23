import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
 drawerheight: string= "100px"; //pouvoir l'injecter dans le html
 drawerwidth: string= "200px";

/*
constructor(height:string,width:string) {
    this.drawerheight = height;
    this.drawerwidth = width;
 }
*/
constructor(){}



}
