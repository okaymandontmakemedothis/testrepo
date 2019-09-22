import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
 drawerheight: string= "90%"; //pourvoir l'injecter dans le html
 drawerwidth: string= "100%";

/*
constructor(height:string,width:string) {
    this.drawerheight = height;
    this.drawerwidth = width;
 }
*/
constructor(){}


}
