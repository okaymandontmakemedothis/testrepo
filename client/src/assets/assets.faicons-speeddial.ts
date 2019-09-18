import {
  faCircle,
  faClipboard,
  faClone,
  faCopy,
  faCropAlt,
  faDrawPolygon,
  faExpand,
  faFeatherAlt,
  faObjectGroup,
  faPaintBrush,
  faPaste,
  faPen,
  faPencilAlt,
  faPenNib,
  faShapes,
  faSprayCan,
  faSquare,
  faSyncAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export class SpeedDialIcons {
  static readonly speedDialIconLists: Map<IconDefinition, IconDefinition[]> = new Map([
    [faPen       , [faPencilAlt, faPaintBrush, faFeatherAlt, faPenNib, faSprayCan]],
    [faShapes    , [faSquare, faCircle, faDrawPolygon]],
    [faExpand    , [faObjectGroup, faCropAlt, faSyncAlt, faClipboard]], // faObjectGroup regular -> selection, solid -> selection inversee
    [faClipboard , [faCopy, faPaste, faClone]],
  ]);
}
