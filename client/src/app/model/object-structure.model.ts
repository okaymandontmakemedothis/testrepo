export const ObjectAtributeStructure: Record<string, Record<string, string>> = {
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
<<<<<<< HEAD
        x: 'x',
        y: 'y',
=======
        x: 'cx',
        y: 'cy',
>>>>>>> 58b810a465e8faf4f0c332c5e1a90f1be52f6b03
        width: 'width',
        height: 'height',
    },
};
