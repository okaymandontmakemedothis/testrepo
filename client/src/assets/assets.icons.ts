import {
  faBars,
  faCircle,
  faClone,
  faCopy,
  faCropAlt,
  faDrawPolygon,
  faEraser,
  faEyeDropper,
  faFeatherAlt,
  faFileExport,
  faFill,
  faFont,
  faImages,
  faObjectGroup,
  faObjectUngroup,
  faPaintBrush,
  faPaste,
  faPencilAlt,
  faPenNib,
  faPlus,
  faRedoAlt,
  faSave,
  faSprayCan,
  faSquare,
  faStamp,
  faSyncAlt,
  faSyringe,
  faUndoAlt,
  faVectorSquare,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export class FaIcons {

  constructor() {
    FaIcons.iconParameters = new Map<IconDefinition, string[]>();
    FaIcons.iconParameters.set(faSquare, [ 'Épaisseur du trait' ]);
    FaIcons.iconParameters.set(faSquare, [ 'Épaisseur du trait' ]);
    FaIcons.iconParameters.set(faPaintBrush, [ 'Épaisseur du trait', 'Texture du trait' ]);
    FaIcons.iconParameters.set(faEyeDropper, [ '' ]);
  }

  static readonly defaultSelectedTool = faPencilAlt;

  static readonly menuTopIconList = [
    faPencilAlt,
    faPaintBrush,
    faFeatherAlt,
    faPenNib,
    faSprayCan,
    faSquare,
    faCircle,
    faDrawPolygon,
    faVectorSquare,
    faFont,
    faSyringe,
    faFill,
    faEraser,
    faStamp,
    faEyeDropper,
    faObjectGroup, // regular -> selection, solid -> selection inversee
    faObjectUngroup,
    faCropAlt,
    faSyncAlt,
    faCopy,
    faPaste,
    faClone,
    faRedoAlt,
    faUndoAlt,
  ];

  static readonly menuBottomIconList = [
    faBars,
  ];

  static readonly fileOptions = [
    faPlus,
    faSave,
    faImages,
    faFileExport,
  ];

  static iconParameters: Map<IconDefinition, string[]>;
}
