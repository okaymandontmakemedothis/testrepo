import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
 drawerheight: string= "1000%"; //pourvoir l'injecter dans le html
 drawerwidth: string= "1000%";

/*
constructor(height:string,width:string) {
    this.drawerheight = height;
    this.drawerwidth = width;
 }
*/
constructor(){}


}
