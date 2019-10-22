export interface Drawing {
    id: string;
    name: string;
    tags: string[];
    width: number;
    height: number;
    backGroundColor: { rgb: { r: number, g: number, b: number }, a: number };
    svg: string;
}

export interface Tag {
    name: string;
    numberOfUses: number;
}
