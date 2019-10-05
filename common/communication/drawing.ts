export interface Drawing {
    name: string;
    tags: string[];
    drawingObjects: DrawingObject[];
}

export interface DrawingObject {
    type: string;
    objectId: number;
    x: number;
    y: number;
    height: number;
    width: number;
    primaryRGBA: { r: number, g: number, b: number, a: number };
    secondaryRGBA: { r: number, g: number, b: number, a: number };
    pointsList: { x: number, y: number }[];
    strokeWidth: number;
    testureId: number;
    style: string;
}

export interface Tag {
    name: string;
    numberOfUses: number;
}