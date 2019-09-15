import {
  faCircle,
  faClipboard,
  faClone,
  faCopy,
  faCropAlt,
  faDrawPolygon,
  faEraser,
  faExpand,
  faEyeDropper,
  faFeatherAlt,
  faFileExport,
  faFill,
  faFont,
  faImages,
  faObjectGroup,
  faPaintBrush,
  faPaste,
  faPen,
  faPencilAlt,
  faPenNib,
  faPlus,
  faRedoAlt,
  faSave,
  faShapes,
  faSprayCan,
  faSquare,
  faStamp,
  faSyncAlt,
  faSyringe,
  faUndoAlt,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons';

export class FaIcons {
  static readonly menuTopIconList = [
    faPen, // faEmpty? We need something to take place of these subsets
    faShapes, // faEmpty? We need something to take place of these subsets
    faVectorSquare,
    faFont,
    faSyringe,
    faFill,
    faEraser,
    faStamp,
    faEyeDropper,
    faExpand, // faEmpty?
    faRedoAlt,
    faUndoAlt,
  ];

  static readonly menuTracingIconList = [
    faPencilAlt,
    faPaintBrush,
    faFeatherAlt,
    faPenNib,
    faSprayCan,
  ];

  static readonly menuShapesIconList = [
    faSquare,
    faCircle,
    faDrawPolygon,
  ];

  static readonly menuSelectionIconList = [
    faObjectGroup, // regular -> selection, solid -> selection inversee
    faCropAlt,
    faSyncAlt,
    faClipboard,
  ];

  static readonly menuClipboardIconList = [
    faCopy,
    faPaste,
    faClone,
  ];

  static readonly menuBottomIconList = [
    faPlus, // faPlusCircle, faPlusSquare,
    faSave,
    faImages,
    faFileExport,
  ];

}
