export const ObjectAtributeStructure: Map<string, Map<string, string>> = new Map([
    ['polyline', new Map([
        ['primaryColor', 'stroke'],
        ['primaryOpacity', 'stroke-Opacity'],
        ['secondaryColor', 'none'],
        ['secondaryOpacity', 'none'],
        ['x', 'x'],
        ['y', 'y'],
        ['width', 'width'],
        ['height', 'height'],
    ])],

    ['rect', new Map([
        ['primaryColor', 'fill'],
        ['primaryOpacity', 'fill-Opacity'],
        ['secondaryColor', 'stroke'],
        ['secondaryOpacity', 'stroke-Opacity'],
        ['x', 'x'],
        ['y', 'y'],
        ['width', 'width'],
        ['height', 'height'],
    ])],
]);
