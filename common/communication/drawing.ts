export interface DrawingPreview {
    name: string;
    tags: string[];
    width: number;
    height: number;
    thumbnail: string|undefined;

}

export interface Drawing {
    name: string;
    tags: string[];
    width: number;
    height: number;
    backGroundColor: { rgb: { r: number, g: number, b: number }, a: number };
    drawingObjects: DrawingObject[];
    thumbnail: string|undefined;
}

export interface DrawingObject {
    type: string;
    objectId: number;
    x: number;
    y: number;
    height: number;
    width: number;
    primaryRGBA: { rgb: { r: number, g: number, b: number }, a: number };
    secondaryRGBA: { rgb: { r: number, g: number, b: number }, a: number };
    pointsList: { x: number, y: number }[];
    strokeWidth: number;
    testureId: number;
    style: string;
}

export interface Tag {
    name: string;
    numberOfUses: number;
}
