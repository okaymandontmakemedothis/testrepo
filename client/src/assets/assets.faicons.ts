import {
  faEraser,
  faExpand,
  faEyeDropper,
  faFileExport,
  faFill,
  faFont,
  faImages,
  faPen,
  faPlus,
  faRedoAlt,
  faSave,
  faShapes,
  faStamp,
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

  static readonly menuBottomIconList = [
    faPlus, // faPlusCircle, faPlusSquare,
    faSave,
    faImages,
    faFileExport,
  ];
}
