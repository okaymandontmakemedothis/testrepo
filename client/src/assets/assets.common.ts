export class Common {
  static readonly BASE_URL: string = 'http://localhost';
  static readonly BASE_SERVER_PORT: string = ':3000';
  static readonly BASE_ENDPOINT: '/api';
  static readonly ICON_MENU_ENDPOINT: '/api/icon/menu'; // returns { 1:[...], 2:[...]}
  static readonly ICON_MENU_TOPNAVBAR_ENDPOINT: '/api/icon/menu/top';
  static readonly ICON_MENU_BOTNAVBAR_ENDPOINT: '/api/icon/menu/bot';
  static readonly ICON_MENU_GROUP_ENDPOINT: '/api/icon/group'; // idem as last comment
  static readonly ICON_MENU_GROUP_QUERY_ENDPOINT: '/api/icon/group/search?id='; //
}
