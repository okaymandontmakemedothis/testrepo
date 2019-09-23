import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
 drawerheight: string= "10000px"; //pouvoir l'injecter dans le html
 drawerwidth: string= "2000px";

 //height:number;
 //weight:number;


/*constructor(height:string,width:string) {
    this.drawerheight = height;
    this.drawerwidth = width;
 }*/

constructor(){

 // this.drawerheight= height +"px";
}



}
