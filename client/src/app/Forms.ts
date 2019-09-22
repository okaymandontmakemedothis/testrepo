import { IShape } from './IShape';

export class Rectangle implements IShape{
      heigth: number;
      width: number;
      descriptor: string = '' ;
      draw(): string{

        return this.descriptor;

      }
}
