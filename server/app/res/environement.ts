import { ApiDef } from '../../../common/communication/api-def';

export const MONGODB_URL = 
// 'mongodb+srv://polydessin:pde16@polydessin-rvndn.gcp.mongodb.net/test?retryWrites=true&w=majority';

'mongodb://localhost:27017/polydessin';

export const BASE_ROUTE = '/api';

export const DATABASE_NAME = 'polydessin';

export const TAG_COLLECTION = 'tags';

export const DRAWING_COLLECTION = 'drawings';

export const CONFIG_API_DEF: ApiDef = {
    date: 'date',
    drawing: 'drawings',
    index: 'index',
    tag: 'tags',
};
