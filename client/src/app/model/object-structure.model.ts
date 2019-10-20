export const OBJECT_ATTRIBUTE_STRUCTURE: Record<string, Record<string, string>> = {
    polyline: {
        primaryColor: 'stroke',
        primaryOpacity: 'stroke-opacity',
        secondaryColor: 'none',
        secondaryOpacity: 'none',
        x: 'x',
        y: 'y',
        width: 'width',
        height: 'height',
    },

    rect: {
        primaryColor: 'fill',
        primaryOpacity: 'fill-opacity',
        secondaryColor: 'stroke',
        secondaryOpacity: 'stroke-opacity',
        x: 'x',
        y: 'y',
        width: 'width',
        height: 'height',
    },

    ellipse: {
        primaryColor: 'fill',
        primaryOpacity: 'fill-opacity',
        secondaryColor: 'stroke',
        secondaryOpacity: 'stroke-opacity',
        x: 'cx',
        y: 'cy',
        width: 'width',
        height: 'height',
    },
};
