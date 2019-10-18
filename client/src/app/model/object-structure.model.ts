export const OBJECT_ATTRIBUTE_STRUCTURE: Record<string, Record<string, string>> = {
    polyline: {
        primaryColor: 'stroke',
        primaryOpacity: 'stroke-Opacity',
        secondaryColor: 'none',
        secondaryOpacity: 'none',
        x: 'x',
        y: 'y',
        width: 'width',
        height: 'height',
    },

    rect: {
        primaryColor: 'fill',
        primaryOpacity: 'fill-Opacity',
        secondaryColor: 'stroke',
        secondaryOpacity: 'stroke-Opacity',
        x: 'x',
        y: 'y',
        width: 'width',
        height: 'height',
    },

    ellipse: {
        primaryColor: 'fill',
        primaryOpacity: 'fill-Opacity',
        secondaryColor: 'stroke',
        secondaryOpacity: 'stroke-Opacity',
        x: 'cx',
        y: 'cy',
        width: 'width',
        height: 'height',
    },
};
